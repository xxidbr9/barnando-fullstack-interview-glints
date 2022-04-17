import 'reflect-metadata';
import * as dotenv from 'dotenv';
import moduleAlias from "module-alias";



(async () => {
  // load aliasing
  moduleAlias.addAliases({
    "@core": `${__dirname}/core`,
    "@config": `${__dirname}/config`,
    "@constants": `${__dirname}/constants`,
    "@domain": `${__dirname}/domain`,
    "@app": `${__dirname}/app`,
    "@infrastructure": `${__dirname}/infrastructure`,
    "@transport": `${__dirname}/transport`
  });

  dotenv.config();
  // await initialize();
  await import("./entrypoint").then(mod => mod.initialize());
})();