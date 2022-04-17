import { AccountEntity } from "@app/account/domain"
import { Entity, Column, PrimaryColumn, OneToOne, Index } from "typeorm"
import { RestaurantEntity } from "./restaurant"

@Entity({
  name: "restaurant_open_time"
})
export class RestaurantOpenTimeEntity {
  @PrimaryColumn("text")
  id!: string

  @OneToOne(() => RestaurantEntity)
  @Column({
    type: "text",
    name: "restaurant_id"
  })
  restaurantID!: string

  @Column("numeric")
  day!: number

  @Column({
    type: "bigint",
    name: "open_time"
  })
  @Index()
  openTime!: string

  @Column({
    type: "bigint",
    name: "close_time"
  })
  @Index()
  closeTime!: string


}
