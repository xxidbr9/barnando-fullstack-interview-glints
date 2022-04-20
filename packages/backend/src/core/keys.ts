export const KEYS = {
  // Dependencies
  PostgresDB: Symbol('PostgresDB'),

  // Repositories
  AccountRepository: Symbol('AccountRepository'),
  AccountSocialRepository: Symbol('AccountSocialRepository'),
  RestaurantRepository: Symbol('RestaurantRepository'),
  FavoriteRepository: Symbol('FavoriteRepository'),

  // Data Mappers
  AccountDataMapper: Symbol('AccountDataMapper'),
  AccountSocialDataMapper: Symbol('AccountSocialDataMapper'),
  RestaurantDataMapper: Symbol('RestaurantDataMapper'),
  RestaurantOpenTimeDataMapper: Symbol('RestaurantOpenTimeDataMapper'),
  FavoriteDataMapper: Symbol('FavoriteDataMapper'),
  FavoriteRestaurantDataMapper: Symbol('FavoriteRestaurantDataMapper'),



  // Application Services
  AccountApplication: Symbol('AccountApplication'),
  RestaurantApplication: Symbol('RestaurantApplication'),
  FavoriteApplication: Symbol('FavoriteApplication'),
  NotifierApplication: Symbol('NotifierApplication'),


  // Websocket
  WebSocketController: Symbol('WebSocketController'),



};
