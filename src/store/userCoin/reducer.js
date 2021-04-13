const initialState = { loading: true, allCoins: {} };

export default function userCoinSliceReducer(state = initialState, action) {
switch (action.type) {


// case "coins/fetched":
// return {
// loading: false,
// allReservations: action.payload,
// };
 case "userCoinsList/fetched":
      return {
        loading: false,
        allCoins: action.payload,
      };

case "coins/addOneCoin":
return { ...state, ...action.payload };
default:
return state;
}
} 