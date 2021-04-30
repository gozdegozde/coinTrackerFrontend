import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import moment from "moment"
import ScriptTag from 'react-script-tag';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../components/Loading"

import { fetchCoin } from "../../store/coinDetail/actions";
import { selectCoins } from "../../store/coinDetail/selectors";
import { selectUser } from "../../store/user/selectors"
import { postCoin } from "../../store/userCoin/actions";


export default function CoinDetails() {

   const dispatch = useDispatch();
    const { ids } = useParams();
    

    const user = useSelector(selectUser);

    const [amount, setAmount] = useState()
    const amountNumber = parseFloat(amount)
  
    useEffect (() => {
        dispatch(fetchCoin(ids))
    }, [dispatch, ids])

    const coinData = useSelector(selectCoins)
  ;
  
    return !Array.isArray(coinData) ? (
    <Loading/>
  ) : (
    coinData.map((coin) => {
      
      return (
       <div key={coin.id} className='container mt-5'>

          <div>
 
            <h1>{coin.symbol} Price Statistics</h1>
            
            <div className="nomics-ticker-widget" data-name={coin.name} data-base={coin.currency} dataquote="USD"></div>
          <ScriptTag type="text/javascript" src="https://widget.nomics.com/embed.js" /> <br/>

               <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th colSpan="2" scope="col"><h1 className='text-primary mb-4'>{moment(coin.price_timestamp).format("DD-MM-YYYY")}</h1></th>
              </tr>
             <tr>
                <td><img src={coin.logo_url} alt="some" width="55" height="55"/></td>
                <td>{coin.name}</td>
              </tr>
               <tr>
                <td>Status</td>
                 {coin.status === "active" ? (
                    <td className="text-success">{coin.status}</td>
                ):(
                    <td className="text-danger">{coin.status}</td>
                )}
              </tr>
               <tr>
                <td>Currency</td>
                <td>{coin.currency}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${parseFloat(coin.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              </tr>
              <tr>
                <td>Price Change</td>
                {coin["1d"] !== undefined ? (coin["1d"].price_change < 0 ? (
                  <td className="text-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                  </svg>
                    ${parseFloat(coin["1d"].price_change).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</td>
                ):(
                   <td className="text-success">
                     <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                      </svg>
                     ${parseFloat(coin["1d"].price_change).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</td>
                )): (<td>0</td>)}
              </tr>
               <tr>
                <td>Market Cap</td>

               {coin.market_cap === undefined ?
                (<td>0</td>) 
                :
                (<td>${parseFloat(coin.market_cap).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>)} 
              </tr>
               <tr>
                <td>Market Cap Change</td>
                
                  {coin["1d"] !== undefined ? (coin['1d'].market_cap_change_pct < 0 ? (
                     <td className="text-danger">
                           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                          </svg>
                   {coin['1d'].market_cap_change_pct}%</td>
                  ): ( <td className="text-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                          </svg>
                    {coin['1d'].market_cap_change_pct}%</td>)): (<td>0</td>)}
              </tr>
              <tr>
                <td>Circulating Supply</td>
                {coin.circulating_supply === undefined ? (<td>0</td>) 
                :
                ( <td>{(coin.circulating_supply).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {coin.symbol}</td>)}
               
              </tr>
               <tr>
                <td>Max Supply</td>
                
              
              {coin.max_supply === undefined ? (<td></td>) : (<td>{(coin.max_supply).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {coin.symbol}</td>) }
              </tr>
               <tr>
                <td>Market Rank</td>
                <td>#{coin.rank}</td>
              </tr>
             {user.token ? 
                (<tr><td>Amount </td>
                <td><input 
                value={amount}
                onChange={(event) => setAmount(event.target.value)} 
                type="number" 
                step="0.01">
                </input>
                </td>
                </tr>) 
                :
                (null)}
              </thead>
              </table>
            
        </div>
         
            <div>
               
            {user.token ? 
                (
                <Link to={"./portfolio"}><Button onClick={(e) => {dispatch(postCoin(  coin.id, amountNumber ))}}>Add to MyPortfolio</Button></Link>
                ) 
                :
                (null)}
            </div>
        </div>
      
      );
        
    })
  );
}