import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import moment from "moment"

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { fetchCoin } from "../../store/coinDetail/actions";
import { selectCoins } from "../../store/coinDetail/selectors";
import { selectUser } from "../../store/user/selectors"
//import ReactDOM from 'react-dom';


// function myFunction() {

// const element = <div> <div class="nomics-ticker-widget" data-name="APIS" data-base="APIS" data-quote="USD"></div><script src="https://widget.nomics.com/embed.js"></script></div>;
// ReactDOM.render(element, document.getElementById('root'));

// }


export default function CoinDetails() {

   const dispatch = useDispatch();
    const { ids } = useParams();
    const [detail1, setDetail1] = useState(false)
    const [detail2, setDetail2] = useState(false)
    const [detail3, setDetail3] = useState(false)

    const displayButton1 = detail1 === false;
    const displayButton2 = detail2 === false;
    const displayButton3 = detail3 === false;

    const user = useSelector(selectUser);
    useEffect (() => {
        dispatch(fetchCoin(ids))
    }, [dispatch, ids])

    const coinData = useSelector(selectCoins)
  ;
    return !Array.isArray(coinData) ? (
    <p>loading ...</p>
  ) : (
    coinData.map((coin) => {
      console.log("coin length", coin)
      
      return (
        
       <div  className='container mt-5'>

          <div>
 
            <h1>{coin.symbol} Price Statistics</h1>
            
            {displayButton1 ? (
                <button onClick = {()=> setDetail1(true)}>
                    Today's Details
                </button>
            ) :  <button onClick = {()=> setDetail1(false)}>
                    Today's Details
                </button>}
            {detail1 ? (

               <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th colspan="2" scope="col"><h1 className='text-primary mb-4'>{moment(coin.price_timestamp).format("DD-MM-YYYY")}</h1></th>
              </tr>
             <tr>
                <td><img src={coin.logo_url} alt="some" width="55" height="55"/></td>
                <td>{coin.name}</td>
              </tr>
               <tr>
                <td>Status</td>
                 <td>{coin.status === "active" ? (
                    <p className="text-success">{coin.status}</p>
                ):(
                    <p className="text-danger">{coin.status}</p>
                )}</td>
              </tr>
               <tr>
                <td>Currency</td>
                <td>{coin.currency}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${coin.price}</td>
              </tr>
               <tr>
                <td>Market Cap</td>
                <td>${coin.market_cap}</td>
              </tr>
               <tr>
                <td>Market Rank</td>
                <td>#{coin.rank}</td>
              </tr>
              </thead>
              </table>
            
                
            ) : null}
            
        </div>
         <div>
            <br/>
            {displayButton2 ? (
                <button onClick = {()=> setDetail2(true)}>
                    Yesterday's Details
                </button>
            ) : <button onClick = {()=> setDetail2(false)}>
                    Yesterday's Details
                </button>}
            {detail2 ? (
                  <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th colspan="2" scope="col"><h1 className='text-primary mb-4'>{moment().subtract(1, 'days').format("DD-MM-YYYY")   }</h1></th>
              </tr>
             <tr>
                <td><img src={coin.logo_url} alt="some" width="55" height="55"/></td>
                <td>{coin.name}</td>
              </tr>
               <tr>
                <td>Status</td>
                <td>{coin.status === "active" ? (
                    <p className="text-success">{coin.status}</p>
                ):(
                    <p className="text-danger">{coin.status}</p>
                )}</td>
              </tr>
               <tr>
                <td>Currency</td>
                <td>{coin.currency}</td>
              </tr>
              <tr>
                <td>Price Change</td>
                <td>{coin["1d"].price_change < 0 ? (
                  <p className="text-danger">${coin["1d"].price_change }</p>
                ):(
                   <p className="text-success">${coin["1d"].price_change }</p>
                )}</td>
              </tr>
               <tr>
                <td>Market Cap Change</td>
                <td>{coin['1d'].market_cap_change_pct}%</td>
              </tr>
              </thead>
              </table>
            
            ) : null}
            
        </div>
         <div>
            <br/>
            {displayButton3 ? (
                <button onClick = {()=> setDetail3(true)}>
                   {coin.currency} Supply
                </button>
            ) : <button onClick = {()=> setDetail3(false)}>
                    {coin.currency} Supply
                </button>}
            {detail3 ? (
                    <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th colspan="2" scope="col"></th>
              </tr>
             <tr>
                <td>Circulating Supply</td>
                <td>{coin.circulating_supply} {coin.symbol}</td>
              </tr>
               <tr>
                <td>Max Supply</td>
                <td>{coin.max_supply} {coin.symbol}</td>
              </tr>
              </thead>
              </table>
            ) : null}
            <div><br/>
                {user.token ? 
                (
                <input type="number" step="0.01"></input>
                ) 
                :
                (null)}
                <br/><br/>
            {user.token ? 
                (
                <Link to={"./portfolio"}><button>Add to MyPortfolio</button></Link>
                ) 
                :
                (null)}
            </div>
        </div>
       </div>
       
      );
        
    })
  );
}