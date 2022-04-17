export default {
  API_PORT: process.env.API_PORT || '9000',
  POSTGRES_DB_HOST: process.env.POSTGRES_DB_HOST || 'localhost',
  POSTGRES_DB_DATABASE_NAME: process.env.POSTGRES_DB_DATABASE_NAME || 'air_restaurant',
  POSTGRES_DB_USERNAME: process.env.POSTGRES_DB_USERNAME || 'postgres',
  POSTGRES_DB_PASSWORD: process.env.POSTGRES_DB_PASSWORD || 'avenger',
  POSTGRES_DB_PORT: process.env.POSTGRES_DB_PORT || 5432
};