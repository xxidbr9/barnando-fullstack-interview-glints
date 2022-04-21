import { ActionRedux } from "@utils/types/redux"
import actionTypes, { ExampleConstantsTypes } from "./example.constant"
import { ExampleStateType } from "./example.reducer"


type ExampleAction = ActionRedux<ExampleConstantsTypes, ExampleStateType>
export function failure(error): ExampleAction {
  return {
    type: actionTypes.FAILURE,
    error,
  }
}

export function increment(): ExampleAction {
  return { type: actionTypes.INCREMENT }
}

export function decrement(): ExampleAction {
  return { type: actionTypes.DECREMENT }
}

export function reset(): ExampleAction {
  return { type: actionTypes.RESET }
}

export function loadData(): ExampleAction {
  return { type: actionTypes.LOAD_DATA }
}

export function loadDataSuccess(data): ExampleAction {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    payload: data,
  }
}

export function startClock(): ExampleAction {
  return { type: actionTypes.START_CLOCK }
}

export function tickClock(isServer: boolean): ExampleAction {
  return {
    type: actionTypes.TICK_CLOCK,
    payload: {
      light: !isServer
    }
  }
}
