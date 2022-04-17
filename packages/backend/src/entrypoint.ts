import '@infrastructure/transport/http/controllers';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import * as morgan from 'morgan';
import config from '@config/main';
import { Application as ExpressApplication } from 'express';
import { applicationContainerModule } from '@app/app.container';
import { infrastructureContainerModule } from '@infrastructure/infra.container';
import { errorHandler, notFoundHandler } from '@infrastructure/transport/http/middleware';

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
  });


  server.setErrorConfig((app: ExpressApplication) => {
    app.use("*",notFoundHandler)
    app.use(errorHandler);
  });


  const apiServer = server.build();
  apiServer.listen(config.API_PORT, () =>
    console.log('The application is initialized on the port %s', config.API_PORT)
  );

  return container;
};

export { initialize };
