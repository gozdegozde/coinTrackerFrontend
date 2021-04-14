import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import coinSliceReducer from './coin/reducer'
import coinPageSliceReducer from './coinDetail/reducer'
import userCoinSliceReducer from './userCoin/reducer'
import authReducer from './addCoin/reducer'

export default combineReducers({

  userCoins:userCoinSliceReducer,
  authReducer:authReducer,
  coinDetail: coinPageSliceReducer,
  coin: coinSliceReducer,
  appState,
  user
});
