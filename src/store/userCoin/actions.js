import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions"
const apiUrl = process.env.API_URL || "https://cors-anywhere.herokuapp.com/https://track-your-coins.herokuapp.com";

export const postCoin = (name,amount, price, ticker, logo_url) => async (
  dispatch,
  getState
) => {
  try {
    const state = getState();
    
    const token = state.user.token;
    const name = state.coinDetail.coin["0"].name;
    const ticker = state.coinDetail.coin["0"].symbol;
    const price = state.coinDetail.coin["0"].price;
    const logoUrl = state.coinDetail.coin["0"].logo_url;
    const userId = state.user.id;
     
    console.log("amount in action", typeof amount)


    console.log("user", userId)
    console.log("coin details", name,ticker,price,logoUrl)
  
    if (!token) return;

    const response = await axios.post(
      `${apiUrl}/addcoin`,
      { name, ticker, price,logoUrl,userId, amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`create new res:`, response.data);
    dispatch(oneMoreCoin(response.data));
    dispatch(
      showMessageWithTimeout(
        "success",
        true,
        "Added to MyPortfolio"
      )
    );
    dispatch(fetchUserCoins(userId))
  } catch (e) {
    console.log(e.message);
  }
};

function oneMoreCoin(post) {
  return {
    type: "coins/addOneCoin",
    payload: post,
  };
}
export function userCoinsList(data) {
  console.log("data",data )
  return {
    type: "userCoinsList/fetched",
    payload: data,
  };
}

export function fetchUserCoins(userId) {
  return async function thunk(dispatch, getState) {
    const response = await axios.get(`${apiUrl}/users/${userId}/coins
    `);
    const allCoins = response.data;
    dispatch(userCoinsList(allCoins));
  };
}
export const coinDeleted = (coinId) => ({
  type: "coin/coinDelete",
  payload: coinId,
});

export const deleteCoin = (coinId,userId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userToken = state.user.token

    try {
      const res = await axios.delete(
        `${apiUrl}/users/${userId}/coins/${coinId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("coin deleted", res);
      dispatch(coinDeleted(coinId));
    } catch (e) {
      console.error(e);
    }
  };
};