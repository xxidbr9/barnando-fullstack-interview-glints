import { FavoriteRestaurantEntity } from "@app/favorites/domain"
import { Entity, Column, PrimaryColumn, Index, OneToMany, JoinColumn } from "typeorm"
import { RestaurantOpenTimeEntity } from "./restaurantOpenTime"

@Entity({
  name: "restaurant"
})
export class RestaurantEntity {
  @PrimaryColumn("text")
  id!: string

  @Column("text")
  @Index()
  name!: string

  @Column("text", { array: true })
  pictures!: string[]

  @Column("text")
  address!: string

  @OneToMany((type) => RestaurantOpenTimeEntity, (schedules) => schedules)
  schedules!: RestaurantOpenTimeEntity[]

  @OneToMany((type) => FavoriteRestaurantEntity, (favoriteRestaurant) => favoriteRestaurant)
  favoriteRestaurant!: FavoriteRestaurantEntity[]
}
