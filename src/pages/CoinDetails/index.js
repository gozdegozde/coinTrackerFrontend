import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
// import "../../../src/index.css";


// import ReactMarkdown from "react-markdown";
// import moment from "moment";

import { fetchCoin } from "../../store/coinDetail/actions";
import { selectCoins } from "../../store/coinDetail/selectors";

export default function CoinDetails() {
   const dispatch = useDispatch();
    const { ids } = useParams();

    useEffect (() => {
        dispatch(fetchCoin(ids))
    }, [dispatch, ids])

    const coinData = useSelector(selectCoins)
    return !Array.isArray(coinData) ? (
    <p>loading ...</p>
  ) : (
    coinData.map((coin) => {
      return (
       <div>
      
            Name : {coin.name} <br/>
            <img src={coin.logo_url} alt="some" width="35" height="35"/>


       </div>
      );
    })
  );
}