import { AccountEntity } from "@app/account/domain"
import { DBTestHelper } from "@shared/helpers/testHelper"
import { PushNotificationEntity } from "../domain/notifierPushNotificationDomain"

let DB: DBTestHelper
let user: AccountEntity

beforeAll(async () => {
  DB = await new DBTestHelper([PushNotificationEntity, AccountEntity]).setupTestDB()
  // create initial user
  const accountEntity = new AccountEntity()
  accountEntity.id = "USER_ID_123"
  accountEntity.email = "barnando13@gmail.com"
  accountEntity.fullName = "Barnando Akbarto Hidayatullah"
  accountEntity.password = "qwerty"
  accountEntity.pictureProfileUrl = "https://source.unsplash.com/random/picture"

  user = await DB.dbConnect.manager.save(accountEntity)
})

afterAll(() => {
  DB.teardownTestDB()
})

describe("Test all notification entity", () => {
  test("create new user push notification", async () => {
    const pushNotification = new PushNotificationEntity()
    pushNotification.fcmToken = "token"
    pushNotification.userID = user.id as string

    const repo = DB.dbConnect.getRepository(PushNotificationEntity)

    const resp = repo.save(pushNotification)
    expect(resp).toEqual(pushNotification)
  })

})