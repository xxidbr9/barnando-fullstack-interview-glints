SELECT
  "favorite"."id" AS "favorite_id",
  "favorite"."name" AS "favorite_name",
  "favorite"."user_id" AS "favorite_user_id",
  "favorite"."parent_id" AS "favorite_parent_id",
  "favorite"."created_at" AS "favorite_created_at",
  "favorite"."updated_at" AS "favorite_updated_at",
  "favoriteRestaurant"."id" AS "favoriteRestaurant_id",
  "favoriteRestaurant"."favorite_id" AS "favoriteRestaurant_favorite_id",
  "favoriteRestaurant"."restaurant_id" AS "favoriteRestaurant_restaurant_id",
  "favoriteRestaurant"."adder_id" AS "favoriteRestaurant_adder_id",
  "favoriteRestaurant"."created_at" AS "favoriteRestaurant_created_at",
  "favoriteRestaurant"."favoriteIDId" AS "favoriteRestaurant_favoriteIDId",
  "favoriteRestaurant"."restaurantIDId" AS "favoriteRestaurant_restaurantIDId",
  "favoriteRestaurant"."adderIDId" AS "favoriteRestaurant_adderIDId",
  "favoriteRestaurant"."favoriteId" AS "favoriteRestaurant_favoriteId",
  "favoriteRestaurant"."restaurantId" AS "favoriteRestaurant_restaurantId"
FROM
  "user_favorite" "favorite"
  LEFT JOIN "user_favorite_restaurant" "favoriteRestaurant" ON "favoriteRestaurant"."favorite_id" = "favorite"."id"
WHERE
  favorite = $ 1
  AND "favoriteRestaurant"."restaurant_id" = $ 2
  AND "favorite"."user_id" = $ 3 -- PARAMETERS: ["c0b0f872-5812-4a52-8c0f-93d0d31da7e3","02c42b79-112d-4396-8fc4-7a43203be840","05b9b1f3-686c-412a-b3fa-a207793dedb8"]