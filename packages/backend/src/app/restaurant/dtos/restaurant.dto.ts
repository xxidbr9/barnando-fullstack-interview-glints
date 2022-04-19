import { DayToDay, DayToDayJSON } from "@shared/types/day";

export class RestaurantDto {
  public schedules: DayToDayJSON[]
  constructor(
    public id: string,
    public name: string,
    public pictures: string[],
    public address: string,
    openSchedules: DayToDay[],
  ) {
    this.schedules = openSchedules.map((schedule) => (
      {
        day: +schedule.day,
        open_time: +schedule.openTime,
        close_time: +schedule.closeTime,
      }
    ))

  }


}

