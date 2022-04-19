export type DayOfTheWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | 'tues' | 'weds' | 'thurs';
type DayOfTheWeekMap<T> = { [day in DayOfTheWeek]: T };

export type NumberOfDayWeeks = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type DayToDay = {
  day: number,
  closeTime: number,
  openTime: number
}

export type DayToDayJSON = {
  day: number,
  close_time: number,
  open_time: number
}
