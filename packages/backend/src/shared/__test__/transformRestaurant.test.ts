import parser, { checkIsNumeric, findDay, range } from "@shared/helpers/transformRestaurant";
import moment from "moment";
import momentTZ from "moment-timezone";

const parseTo12Hour = (time: number) => momentTZ.unix(time).tz("Asia/Jakarta").format("hh:mm A")

const TEST_CASE_1 = "Mon-Sun 11 am - 10:30 pm";
const EXPECTED_TEST_1 = [
  { day: 0, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 1, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 2, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 3, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 4, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 5, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 6, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) }
];

// case 2
const TEST_CASE_2 = "Mon - Sun 11 am - 10:30 pm";
const EXPECTED_TEST_2 = [
  { day: 0, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 1, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 2, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 3, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 4, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 5, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 6, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) },
  { day: 6, openTime: parseTo12Hour(1650340800), closeTime: parseTo12Hour(1650382200) }
];

const TEST_CASE_3 = "Sun = Mon 11 am - 10:30 pm";
const EXPECTED_TEST_3 = [
  { day: 6, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 0, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) }
];

const TEST_CASE_4 = "Mon, Sat, Sun 11 am - 10:30 pm";
const EXPECTED_TEST_4 = [
  { day: 0, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 5, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) },
  { day: 6, openTime: parseTo12Hour(1650168000), closeTime: parseTo12Hour(1650209400) }
];

const TEST_CASE_5 =
  "Mon, Weds 5:30 am - 3:30 am / Tues 1:30 pm - 4 pm / Thurs 3 pm - 12:15 pm / Fri 1 pm - 2 pm / Sat 7:45 am - 12 pm / Sun 11:15 am - 7:45 pm";
const EXPECTED_TEST_5 = [
  { day: 0, openTime: parseTo12Hour(1650148200), closeTime: parseTo12Hour(1650141000) },
  { day: 2, openTime: parseTo12Hour(1650148200), closeTime: parseTo12Hour(1650141000) },
  { day: 1, openTime: parseTo12Hour(1650177000), closeTime: parseTo12Hour(1650186000) },
  { day: 3, openTime: parseTo12Hour(1650182400), closeTime: parseTo12Hour(1650172500) },
  { day: 4, openTime: parseTo12Hour(1650175200), closeTime: parseTo12Hour(1650178800) },
  { day: 5, openTime: parseTo12Hour(1650156300), closeTime: parseTo12Hour(1650171600) },
  { day: 6, openTime: parseTo12Hour(1650168900), closeTime: parseTo12Hour(1650199500) }
]


const TEST_CASE_6 = "Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm"
const EXPECTED_TEST_6 = [
  { day: 0, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650376800) },
  { day: 1, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650376800) },
  { day: 2, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650376800) },
  { day: 3, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650376800) },
  { day: 4, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650378600) },
  { day: 5, openTime: parseTo12Hour(1650342600), closeTime: parseTo12Hour(1650378600) }
]

// Begin Testing
describe("Transform string (TIME) to object", () => {
  test("Detect can be use in range", () => {
    const result = parser(TEST_CASE_1);
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_1);
  });

  test("Detect can be use in range (using space in gap)", () => {
    const result = parser(TEST_CASE_2);
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_2);
  });

  test("Detect can be use in range (Weekend first)", () => {
    const result = parser(TEST_CASE_3);
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_3);
  });

  test("Detect can be on selected day", () => {
    const result = parser(TEST_CASE_4);
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_4);
  });

  test("Detect can be on complex day", () => {
    const result = parser(TEST_CASE_5);
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_5);
  });

  test("Double Gap day", () => {
    const result = parser(TEST_CASE_6)
    const finalResult = result.map((time) => ({ ...time, closeTime: parseTo12Hour(time.closeTime), openTime: parseTo12Hour(time.openTime) }))
    expect(finalResult).toEqual(EXPECTED_TEST_6)
  })
});

describe("Testing for Helpers", () => {
  test("Check the string are number", () => {
    expect(checkIsNumeric("2")).toBeTruthy();
  });

  test("find day as number", () => {
    const day = findDay("mon");
    expect(day).toBe(0);
  });

  test("find days as number", () => {
    const day = findDay("thurs");
    expect(day).toBe(3);
  });

  test("check if null", () => {
    const day = findDay("");
    expect(day).toBe(null);
  });

  test("check all day", () => {
    const t = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", 'tues', 'weds', 'thurs']
    const b = t.map(e => findDay(e))
    expect(b.length).toBe(t.length)
  })

  test("check is the first are bigger", () => {
    const arr = [6, 0];
    expect(range(arr[0], arr[1])).toEqual(arr);
  });
});
