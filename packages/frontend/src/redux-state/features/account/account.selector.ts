
import { RootState } from "@redux-state/index"
import { createSelector } from "@reduxjs/toolkit"

const accountProfile = (state: RootState) => state.accountReducer.profile
export const getIsLogin = (state: RootState) => state.accountReducer.isLogin
export const getAccountProfile = createSelector(accountProfile, accountProfile => accountProfile)
