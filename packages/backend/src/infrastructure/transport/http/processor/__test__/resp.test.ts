import { okResp } from "../index";

describe("Check resp result", () => {
  test("OK RESP", () => {
    const result = okResp({ hello: "world" }, "Hello World!", 200)
    expect(result).toEqual({ status: 200, message: 'Hello World!', data: { hello: 'world' } })
  })

  test("Test if not contain message", () => {
    const result = okResp({ hello: "world" })
    expect(result).toEqual({ status: 200, message: 'Success', data: { hello: 'world' } })
  })
})