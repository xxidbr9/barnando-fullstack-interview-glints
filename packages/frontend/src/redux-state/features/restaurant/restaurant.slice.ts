import { IRestaurant } from '@models/restaurant.model';
import { ISearchRestaurantParams, searchRestaurantNetwork } from '@networks/restaurant.network';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface RestaurantState {
  restaurants?: IRestaurant[]
  is_have_next: boolean,
  total: number
  page?: number,
  loading?: boolean,
  error?: any
}

const initialState: RestaurantState = {
  restaurants: [],
  is_have_next: false,
  total: 0,
  page: 1,
  loading: true,
  error: null
}

const fetchNextRestaurant = createAsyncThunk(
  'restaurant/fetchRestaurantNext',
  async (params: ISearchRestaurantParams, _thunkAPI) => {
    try {
      const response = await searchRestaurantNetwork({ ...params })
      return {
        ...response.data.data,
        page: params.page,
      }
    } catch (err) {
      return {
        error: err
      }
    }
  }
)

const fetchRestaurant = createAsyncThunk(
  'restaurant/fetchRestaurant',
  async (params: ISearchRestaurantParams, _thunkAPI) => {
    try {
      const response = await searchRestaurantNetwork({ ...params })
      return {
        ...response.data.data,
        page: params.page,
      }
    } catch (err) {
      return {
        error: err
      }
    }
  }
)

export const restaurantSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setRestaurant(state, action: { payload: RestaurantState, type: string }) {
      const newRestaurants = [...state.restaurants, ...action.payload.restaurants]
      return {
        ...state,
        restaurants: newRestaurants,
        is_have_next: action.payload.is_have_next,
        total: action.payload.total,
        loading: false,
        page: 1,
      }
    },
  },
  extraReducers: {
    [`${fetchNextRestaurant.pending}`]: (state) => {
      state.loading = true
    },
    [`${fetchNextRestaurant.fulfilled}`]: (state, action) => {
      const newRestaurants = [...state.restaurants, ...action.payload.restaurants]
      return {
        ...state,
        restaurants: newRestaurants,
        is_have_next: action.payload.is_have_next,
        total: action.payload.total,
        loading: false,
        page: action.payload.page
      }
    },
    [`${fetchNextRestaurant.rejected}`]: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    [`${fetchRestaurant.pending}`]: (state) => {
      state.loading = true
    },
    [`${fetchRestaurant.fulfilled}`]: (state, action) => {
      const newRestaurants = action.payload.restaurants
      return {
        ...state,
        restaurants: newRestaurants,
        is_have_next: action.payload.is_have_next,
        total: action.payload.total,
        loading: false,
        page: action.payload.page
      }
    },
    [`${fetchRestaurant.rejected}`]: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const restaurantAction = restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;

export const restaurantThunkAction = {
  fetchNextRestaurant,
  fetchRestaurant
}