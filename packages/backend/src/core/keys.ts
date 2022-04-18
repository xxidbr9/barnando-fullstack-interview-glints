export const KEYS = {
  // Dependencies
  PostgresDB: Symbol('PostgresDB'),

  // Repositories
  AccountRepository: Symbol('AccountRepository'),
  RestaurantRepository: Symbol('RestaurantRepository'),
  FavoriteRepository: Symbol('FavoriteRepository'),

  // Data Mappers
  AccountDataMapper: Symbol('AccountDataMapper'),
  RestaurantDataMapper: Symbol('RestaurantDataMapper'),
  FavoriteDataMapper: Symbol('FavoriteDataMapper'),


  // Application Services
  AccountApplication: Symbol('AccountApplication'),
  RestaurantApplication: Symbol('RestaurantApplication'),
  FavoriteApplication: Symbol('FavoriteApplication'),
  NotifierApplication: Symbol('NotifierApplication'),


  // Websocket
  WebSocketController: Symbol('WebSocketController'),



};
