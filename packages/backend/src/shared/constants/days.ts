import { DayOfTheWeekMap } from "@shared/types/day";

export const DAYS: DayOfTheWeekMap<number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
  // plurals
  tues: 1,
  weds: 2,
  thurs: 3,
};

export const DAY_STORE_FORMAT = "HHmm"
export const DAY_STORE_FORMAT_ZERO = "Hmm"
