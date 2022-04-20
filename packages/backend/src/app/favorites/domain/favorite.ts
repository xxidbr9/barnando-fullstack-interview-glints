import { AccountEntity } from "@app/account/domain"
import { Entity, Column, PrimaryColumn, OneToOne, Index, OneToMany } from "typeorm"
import { FavoriteRestaurantEntity } from "./favoriteRestaurant"

@Entity({
  name: "user_favorite"
})
export class FavoriteEntity {
  @PrimaryColumn("text")
  id?: string

  @Column("text")
  name!: string

  @Column({
    type: "text",
    name: "user_id"
  })
  userID!: string

  @Column({
    type: "text",
    name: "parent_id",
    nullable: true
  })
  @Index()
  parentID?: string

  @Column({ type: "bigint", name: "created_at" })
  createdAt!: Date | number

  @Column({ type: "bigint", name: "updated_at" })
  updatedAt?: Date | number

  @OneToMany(() => FavoriteRestaurantEntity, (favoriteRestaurant) => favoriteRestaurant.restaurant, { onDelete: "CASCADE" })
  favoriteRestaurants?: FavoriteRestaurantEntity[]
}
