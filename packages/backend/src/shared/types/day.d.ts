export type DayOfTheWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | 'tues' | 'weds' | 'thurs';
type DayOfTheWeekMap<T> = { [day in DayOfTheWeek]: T };
