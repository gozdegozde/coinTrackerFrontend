import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import coinSliceReducer from './coin/reducer'
import coinPageSliceReducer from './coinDetail/reducer'

export default combineReducers({

  coinDetail: coinPageSliceReducer,
  coin: coinSliceReducer,
  appState,
  user
});
