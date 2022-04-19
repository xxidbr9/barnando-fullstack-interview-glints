SELECT
  "restaurant"."id" AS "restaurant_id",
  "restaurant"."name" AS "restaurant_name",
  "restaurant"."pictures" AS "restaurant_pictures",
  "restaurant"."address" AS "restaurant_address",
  "schedules"."id" AS "schedules_id",
  "schedules"."restaurant_id" AS "schedules_restaurant_id",
  "schedules"."day" AS "schedules_day",
  "schedules"."open_time" AS "schedules_open_time",
  "schedules"."close_time" AS "schedules_close_time",
  "schedules"."restaurantId" AS "schedules_restaurantId"
FROM
  "restaurant" "restaurant"
  LEFT JOIN "restaurant_open_time" "schedules" ON "schedules"."restaurant_id" = "restaurant"."id"
WHERE
  "schedules"."day" IN (0)