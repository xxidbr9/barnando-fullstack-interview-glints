import { AccountEntity } from "@app/account/domain"
import { RestaurantEntity } from "@app/restaurant/domain/restaurant"
import { Entity, Column, OneToOne, Index, PrimaryColumn, ManyToOne } from "typeorm"
import { FavoriteEntity } from "./favorite"

@Entity({
  name: "user_favorite_restaurant"
})
export class FavoriteRestaurantEntity {
  @PrimaryColumn("text")
  id!: string

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.id, { onDelete: "CASCADE" })
  @Column({
    type: "text",
    name: "favorite_id"
  })
  @Index()
  favoriteID!: string

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.id, { onDelete: "CASCADE" })
  @Column({
    type: "text",
    name: "restaurant_id"
  })
  @Index()
  restaurantID!: string

  @ManyToOne(() => AccountEntity, (account) => account.id, { onDelete: "CASCADE" })
  @Column({
    type: "text",
    name: "adder_id"
  })
  @Index()
  adderID!: string

  @Column({ type: "bigint", name: "created_at" })
  createdAt!: Date | number

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.id, { onDelete: "CASCADE" })
  favorite!: FavoriteEntity

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.favoriteRestaurant, { onDelete: "CASCADE" })
  restaurant!: RestaurantEntity
}
