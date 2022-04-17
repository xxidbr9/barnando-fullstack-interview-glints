import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({
  name: "account"
})
export class AccountEntity {
  @PrimaryColumn("text")
  id!: string

  @Column({
    length: 200,
    name: "full_name",
    nullable: true
  })
  fullName!: string

  @Column("text")
  email!: string

  @Column({
    name: "picture_profile_url",
    type: "text",
    nullable: true
  })
  pictureProfileUrl!: string

  @Column("text")
  password!: string
}
