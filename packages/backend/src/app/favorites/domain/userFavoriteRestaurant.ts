import { RestaurantEntity } from "@app/restaurant/domain/restaurant"
import { Entity, Column, OneToOne, Index, PrimaryColumn, ManyToOne } from "typeorm"
import { FavoriteEntity } from "./userFavorite"

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

  @Column({ type: "date", name: "create_at" })
  createAt!: Date | number
}
