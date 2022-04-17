import { RestaurantEntity } from "@app/restaurant/domain/restaurant"
import { Entity, Column, OneToOne, Index, PrimaryColumn } from "typeorm"
import { FavoriteEntity } from "./userFavorite"

@Entity({
  name: "user_favorite_restaurant"
})
export class FavoriteRestaurantEntity {
  @PrimaryColumn("text")
  id!: string

  @OneToOne(() => FavoriteEntity)
  @Column({
    type: "text",
    name: "favorite_id"
  })
  @Index()
  favoriteID!: string

  @OneToOne(() => RestaurantEntity)
  @Column({
    type: "text",
    name: "restaurant_id"
  })
  @Index()
  restaurantID!: string
}
