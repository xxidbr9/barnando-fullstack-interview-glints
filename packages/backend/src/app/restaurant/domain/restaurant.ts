import { AccountEntity } from "@app/account/domain"
import { Entity, Column, PrimaryColumn, Index } from "typeorm"

@Entity({
  name: "restaurant"
})
export class RestaurantEntity {
  @PrimaryColumn("text")
  id!: string

  @Column("text")
  @Index()
  name!: string

  @Column("text")
  picture!: string

  @Column("text")
  address!: string
}
