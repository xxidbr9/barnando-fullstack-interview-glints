import { DBTestHelper } from "@shared/helpers/testHelper";
import { AccountEntity, AccountSocialEntity } from "../domain/index";

let DB: DBTestHelper
beforeAll(async () => {
  DB = await new DBTestHelper([AccountEntity, AccountSocialEntity]).setupTestDB()
})

afterAll(() => {
  DB.teardownTestDB()
})

describe("Testing all account Domain Entity", () => {
  let account: AccountEntity
  test("test account entity", async () => {

    account = new AccountEntity()
    account.id = "123"
    account.fullName = "Barnando"
    account.email = "barnando13@gmail.com"
    account.password = "qwerty"
    account.pictureProfileUrl = "https://source.unsplash.com/random/1"

    const resp = await DB
      .dbConnect
      .manager.save(account)

    expect(resp).toEqual(account)
  })

  test("test account entity with relation data", async () => {

    const accountSocial = new AccountSocialEntity()
    accountSocial.provider = "google"
    accountSocial.socialID = "1234"
    accountSocial.userID = account.id

    const repo = DB.dbConnect.getRepository(AccountSocialEntity)

    const resp = await repo.save(accountSocial)

    expect(resp).toEqual(accountSocial)
  })

})
