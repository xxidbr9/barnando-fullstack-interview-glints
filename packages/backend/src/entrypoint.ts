import '@infrastructure/transport/http/controllers';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import * as morgan from 'morgan';
import cors from 'cors'
import config from '@config/main';
import { Application as ExpressApplication } from 'express';
import { applicationContainerModule } from '@app/app.container';
import { infrastructureContainerModule } from '@infrastructure/infra.container';
import { errorHandler, notFoundHandler } from '@infrastructure/transport/http/middleware';

import { Server as SocketServer } from 'socket.io'
import http from 'http';
import { Interfaces, InversifySocketServer, TYPE } from 'inversify-socket-utils';
import { WebSocketController } from '@infrastructure/transport/ws';
import { KEYS } from '@core/keys';

const initialize = async () => {
  const container = new Container();
  container.load(applicationContainerModule);
  await container.loadAsync(infrastructureContainerModule);

  // API Server initializations
  const server = new InversifyExpressServer(container);
  server.setConfig((app: ExpressApplication) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
    const logger = morgan.default("common")
    app.use(logger)
    app.use(cors())
  });


  server.setErrorConfig((app: ExpressApplication) => {
    app.use("*", notFoundHandler)
    app.use(errorHandler);
  });

  const apiServer = server.build();
  const app = http.createServer(apiServer)

  // Websocket start here
  const io = new SocketServer(app, {
    cors: {
      allowedHeaders: ["Content-Type", "Authorization"],
      origin: [
        "http://localhost:3000",
        "http://localhost:9000",
        "http://localhost:3002",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://192.168.10.108:9000",
        "http://192.168.10.108:3000",
        "http://192.168.10.108:5500",
      ],
      methods: ["GET", "POST"],
    },
    cookie: false
  });

  container.bind<Interfaces.Controller>(TYPE.Controller).to(WebSocketController).whenTargetNamed("WebSocketController")

  // socket.io start
  const ioServer = new InversifySocketServer(container, io)
  ioServer.build()

  // run the app
  app.listen(config.API_PORT, () =>
    console.log('The application is initialized on the port %s', config.API_PORT)
  );

  return container;
};

export { initialize };