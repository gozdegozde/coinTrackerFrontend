import axios from 'axios';

const API_URL = `https://api.nomics.com/v1/currencies/ticker?key=39229126e722ab40066b13018df86143&convert=USD`;

export function startLoading() {
  return {
    type: "coin/startLoading"
  };
}

export function coinsFetched(moreCoins) {
  return {
    type: "coin/coinsFetched",
    payload: moreCoins
  };
}

export async function fetchNextPages(dispatch, getState) {
    dispatch(startLoading())

 
    
    const res = await axios.get(`${API_URL}`);
    const moreCoins= res.data;

    dispatch(coinsFetched(moreCoins))

    
  }
