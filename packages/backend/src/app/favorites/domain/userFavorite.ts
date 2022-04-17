import { AccountEntity } from "@app/account/domain"
import { Entity, Column, PrimaryColumn, OneToOne, Index } from "typeorm"

@Entity({
  name: "user_favorite"
})
export class FavoriteEntity {
  @PrimaryColumn("text")
  id!: string

  @Column("text")
  name!: string

  @OneToOne(() => AccountEntity)
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
  parentID!: string
}
