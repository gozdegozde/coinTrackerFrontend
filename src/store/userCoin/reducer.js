const initialState = { loading: true, allCoins: {} };

export default function userCoinSliceReducer(state = initialState, action) {
switch (action.type) {

 case "userCoinsList/fetched":
      return {
        loading: false,
        allCoins: action.payload,
      };

case "coins/addOneCoin":
return { ...state, ...action.payload };

case "coin/coinDelete":
 
    const id = action.payload;
    console.log("action payloaad", action.payload)
    const newCoinList = state.allCoins.filter(
      (coin) =>{ console.log("COIN", coin) 
      return coin.id !== id}
    )
    
    console.log("new coins list", newCoinList)
    return { 
      ...state, 
      allCoins: newCoinList
    }

default:
return state;
}
} 