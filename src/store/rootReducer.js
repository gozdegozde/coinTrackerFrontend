import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import coinSliceReducer from './coin/reducer'

export default combineReducers({
  coin: coinSliceReducer,
  appState,
  user
});
