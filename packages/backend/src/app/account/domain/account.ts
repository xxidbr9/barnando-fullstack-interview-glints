import { Entity, Column, PrimaryColumn, Index } from "typeorm"

@Entity({
  name: "account"
})
export class AccountEntity {
  @PrimaryColumn("text")
  id?: string

  @Column({
    length: 200,
    name: "full_name",
    nullable: true
  })
  fullName!: string

  @Column({ type: "text" })
  @Index()
  email!: string

  @Column({
    name: "picture_profile_url",
    type: "text",
    nullable: true
  })
  pictureProfileUrl?: string

  @Column({ type: "text", nullable: true })
  password?: string
}
