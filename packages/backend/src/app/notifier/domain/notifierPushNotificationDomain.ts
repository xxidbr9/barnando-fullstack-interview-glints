import { AccountEntity } from "@app/account/domain"
import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm"

@Entity({
  name: "user_push_notification"
})
export class PushNotificationEntity {
  @PrimaryColumn({
    name: "fcm_token",
    type: "text"
  })
  fcmToken!: string

  @OneToOne(() => AccountEntity)
  @Column({
    name: "user_id",
    type: "text"
  })
  userID!: string
}