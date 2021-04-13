import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination"
//import moment from "moment";
import { selectUser } from "../../store/user/selectors"
import { fetchNextPages } from '../../store/coin/actions'
import {  selectFeedCoins } from '../../store/coin/selectors'


import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function CoinsFeed() {
     const dispatch = useDispatch();
     //const loading = useSelector(selectCoinLoading)
     const coins = useSelector(selectFeedCoins)
     const [currentPage, setCurrentPage] = useState(1)
     const [postPerPage] = useState(30)

     const user = useSelector(selectUser);

  useEffect(() => {
    
    dispatch(fetchNextPages);
  }, [dispatch]);   

const indexOfLastPost = currentPage * postPerPage
const indexOfTheFirstPost = indexOfLastPost - postPerPage
const currentPosts = coins.slice(indexOfTheFirstPost, indexOfLastPost)
const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return(
    <div className='container mt-5'>
   
      <div>
          
          <h2 className='text-primary mb-4'>COINS LIST</h2>

            <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Price</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">24h %</th>
                  <th scope="col"></th>
                
              </tr>
              </thead>
            
           
      {currentPosts.map(coin => {
        return (
          
          <tbody>
            <tr>
                <th scope="row" ><img src={coin.logo_url} alt={coin.id} width="35" height="35"/></th>
                <td ><Link to= {`${coin.id}`}>{coin.currency}</Link></td>
                <td >{coin.currency}</td>
                <td>{coin.price}</td>
                <td>{coin.market_cap}</td>
                <td>{coin["1d"].price_change_pct < 0 ? (
                  <p className="text-danger">{coin["1d"].price_change_pct} </p>
                ):(
                  <p className="text-success">{coin["1d"].price_change_pct}</p>
                )}</td>
                
                <td><Link to= {`${coin.id}`}><button>See Details</button></Link></td>
               
            </tr>
      </tbody>
       
        );
      })}
      </table>
     <Pagination postsPerPage={postPerPage} totalPosts={coins.length} paginate={paginate}/>
      </div>
      </div>
  )
} 
