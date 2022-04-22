import { Entity, Column, PrimaryColumn, OneToOne, Index, ManyToOne, JoinColumn } from "typeorm"
import { RestaurantEntity } from "./restaurant"

@Entity({
  name: "restaurant_open_time"
})
export class RestaurantOpenTimeEntity {
  @PrimaryColumn("text")
  id!: string

  @Column({
    type: "text",
    name: "restaurant_id"
  })
  restaurantID?: string

  @Column("numeric")
  @Index()
  day!: number

  @Column({
    type: "numeric",
    name: "open_time"
  })
  @Index()
  openTime!: string

  @Column({
    type: "numeric",
    name: "close_time"
  })
  @Index()
  closeTime!: string

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.schedules, { onDelete: "CASCADE" })
  restaurant!: RestaurantEntity
}
