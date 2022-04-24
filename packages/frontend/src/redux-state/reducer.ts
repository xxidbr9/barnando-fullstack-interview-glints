import { accountReducer } from '@features/account'
import { restaurantReducer } from '@features/restaurant'
import { screenReducer } from '@features/screen'
import { combineReducers } from 'redux'

const oldWayReducer = combineReducers({
  screenReducer
})

const reducer = {
  restaurantReducer,
  accountReducer,
  screenReducer
}

export default reducer
