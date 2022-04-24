import { IProfile } from "@models/account.model"
import { createSlice } from "@reduxjs/toolkit"

type AccountState = {
  isLogin?: boolean
  profile?: {
    name: string
    email: string
    picture_profile_url: string
    id: string
  }
}

const initialState: AccountState = {}

type ActionProfileType = { payload: AccountState, type: string }

const accountSlice = createSlice({
  initialState,
  name: "account",
  reducers: {
    setLogin(state, action: ActionProfileType) {
      state.isLogin = action.payload.isLogin
    },
    setAccountProfile(state, action: ActionProfileType) {
      return {
        ...state,
        isLogin: action.payload.isLogin,
        profile: action.payload.profile
      }
    }
  }
})

export const accountAction = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
