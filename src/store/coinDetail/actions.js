import axios from "axios";

const API_URL = `https://api.nomics.com/v1/currencies/ticker?key=39229126e722ab40066b13018df86143&convert=USD`;

export function startLoadingCoin() {
  return {
      type: "coinDetail/startLoadingCoin"
  }
}

export function coinFullyFetched(coinData) {
  return {
      type : "coinDetail/coinFullyFetched",
      payload: coinData
  }
}

export function fetchCoin(ids) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoadingCoin());

    const coinResponse = await axios.get(`${API_URL}&ids=${ids}`);

    const coinData = coinResponse.data
   
    dispatch(coinFullyFetched(coinData))
  }
}