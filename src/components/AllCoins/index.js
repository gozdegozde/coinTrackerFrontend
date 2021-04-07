import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import moment from "moment";

import { fetchNextPages } from '../../store/coin/actions'

import { selectCoinLoading, selectFeedCoins } from '../../store/coin/selectors'

import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function CoinsFeed() {
     const dispatch = useDispatch();
     const loading = useSelector(selectCoinLoading)
     const coins = useSelector(selectFeedCoins)

  useEffect(() => {
    
    dispatch(fetchNextPages);
  }, [dispatch]);   

  return(
      <div>
          Hello all coins will be here
          <h2>COINS</h2>

            <table key="id" >
               <tr>
                  
                  <th>Name</th>
                  <th>Currency</th>
                  <th>Price</th>
                  <th>Market Cap</th>

              </tr>
              
            </table>
      {coins.map(coin => {
        return (
          <thead>
       <th> <Link to= {`/coin`}>{coin.name} {coin.currency}</Link></th>
       <th> {coin.currency}</th>
       <th> {coin.price}</th>
       <th> {coin.market_cap}</th>
    
       </thead>
        );
      })}
       <p>
        {loading ? (
          <em>Loading...</em>
        ) : (
           <button onClick={() => dispatch(fetchNextPages)}>Load more</button>
        )}
      </p>
      </div>
  )
} 
