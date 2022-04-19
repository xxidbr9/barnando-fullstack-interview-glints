import 'reflect-metadata';
import * as dotenv from 'dotenv';
import moduleAlias from "module-alias";



(async () => {
  // load aliasing
  moduleAlias.addAliases({
    "@core": `${__dirname}/core`,
    "@config": `${__dirname}/config`,
    "@app": `${__dirname}/app`,
    "@shared": `${__dirname}/shared`,
    "@infrastructure": `${__dirname}/infrastructure`,
    "@assets": `${__dirname}/assets`,
    "@transport": `${__dirname}/transport`
  });

  dotenv.config();
  // await initialize();
  await import("./entrypoint").then(mod => mod.initialize());
})();