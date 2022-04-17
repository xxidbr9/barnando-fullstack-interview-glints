import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm"
import { AccountEntity } from "./account"

@Entity({
  name: "account_social"
})
export class AccountSocialEntity {
  @PrimaryColumn({
    name:"social_id",
    type:"text"
  })
  socialID!: string

  @OneToOne(() => AccountEntity)
  @Column({
    name:"user_id",
    type:"text"
  })
  userID!: string

  @Column("text")
  provider!: string

}