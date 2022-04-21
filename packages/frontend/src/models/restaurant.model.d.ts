
export interface IRestaurant {
  id: string;
  name: string;
  pictures: string[];
  address: string;
}

export interface IRestaurantResponse {
  restaurants: IRestaurant[];
  total: number
  is_have_next: boolean
}

export interface Schedule {
  day: number;
  open_time: number;
  close_time: number;
}

export interface IRestaurantInfo {
  id: string;
  name: string;
  pictures: string[];
  address: string;
  schedules: Schedule[];
}


export interface IRestaurantInfoResponse {
  restaurant: IRestaurantInfo
}
