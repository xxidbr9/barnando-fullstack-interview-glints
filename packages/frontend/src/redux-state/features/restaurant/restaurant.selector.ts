
import { RootState } from "@redux-state/index"
import { createSelector } from "@reduxjs/toolkit"

const allRestaurant = (state: RootState) => state.restaurantReducer

export const getAllRestaurant = createSelector(allRestaurant, restaurant => restaurant)
export const getAllRestaurantWhenLogin = createSelector(allRestaurant, () => { })