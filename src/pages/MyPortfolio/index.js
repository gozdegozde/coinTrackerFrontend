
import React, { useEffect, useState } from 'react';
import { selectUser } from "../../store/addCoin/selectors";
import {fetchUserCoins} from "../../store/userCoin/actions"
import { selectCoins } from "../../store/userCoin/selectors"
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination"



export default function CoinDetails() {
    const dispatch = useDispatch()
    const users = useSelector(selectUser)
    const coins = useSelector(selectCoins)


     useEffect(() => {
    dispatch(fetchUserCoins(users.id));
  }, [dispatch, users.id]);


return(
        <div className='container mt-5'> 
            <div>
                <h2 className='text-primary mb-4'>  {users.name} 's Portfolio </h2>
       <br/>
        <table key="id" className="table table-hover">
              <thead>
               <tr >
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                
              </tr>
            </thead>
        
        {!Array.isArray(coins) ? (<div>Loading</div>) : (
            coins.map((coin)=> {
                return(
                   <tbody>
                       <tr>
                           <th scope="row" > <img src={coin.logoUrl} alt={coin.id} width="45" height="45"/> </th>
                        
                        <td >{coin.name}</td>
                        <td>{coin.price}</td>
                        <td>{coin.userCoins.amount}</td>
                
                        <td> <button>Delete Coin</button> </td>
                        </tr>
                   </tbody>
                )        
            })
        )}
        </table>
        
        </div>
        </div>

)  
}
