import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination"
import { fetchNextPages } from '../../store/coin/actions'
import {  selectFeedCoins } from '../../store/coin/selectors'
//import Loading from "../Loading"
import Loading from "../../components/Loading"


import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from 'react-bootstrap/Button';

export default function CoinsFeed() {
     const dispatch = useDispatch();
     //const loading = useSelector(selectCoinLoading)
     const coins = useSelector(selectFeedCoins)
     const [currentPage, setCurrentPage] = useState(1)
     const [postPerPage] = useState(30)


  useEffect(() => {
    
    dispatch(fetchNextPages);
  }, [dispatch]);   

const indexOfLastPost = currentPage * postPerPage
const indexOfTheFirstPost = indexOfLastPost - postPerPage
const currentPosts = coins.slice(indexOfTheFirstPost, indexOfLastPost)
const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return(
    <div className='container mt-5'>
   
      <div key="id">
          
          <h2 className='text-primary mb-4'>COINS LIST</h2>

            <table key= {coins.id} className="table table-hover">
              <thead>
               <tr >
                  <th scope="col">#</th>
                  <th scope="col">Ticker</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">24h %</th>
                  <th scope="col"></th>
                
              </tr>
              </thead>
            
           
      {!Array.isArray(currentPosts) ? (<Loading/>): (currentPosts.map(coin => {
        return (
          
          <tbody key = {coin.id}>
            <tr>
                <th scope="row" ><img src={coin.logo_url} alt={coin.id} width="30" height="30"/></th>
                <td ><Link to= {`${coin.id}`}>{coin.currency}</Link></td>
                <td >{coin.name}</td>
                <td>{parseFloat(coin.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td>{(coin.market_cap === undefined ) ? (<td></td>)
                :
                  (coin.market_cap).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                }</td>
           
                {(coin["1d"]) === undefined ?  (<td></td>): (coin["1d"].price_change_pct < 0 ? (
                  
                      <td >
                        <div className="text-danger">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                          </svg>

                        {coin["1d"].price_change_pct} 
                      </div>
                      </td>
                  
                  
                ):(
                   <td>
                     <div className="text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                  </svg>
                      {coin["1d"].price_change_pct}
                      </div>
                  </td>
                 
                ))}
                
                <td><Link to= {`${coin.id}`}><Button>See Details</Button></Link></td>
               
            </tr>
      </tbody>
       
        );
      }))}
      </table>
    
     <Pagination postsPerPage={postPerPage} totalPosts={960} paginate={paginate}/>
      </div>
      </div>
      
  )
} 
