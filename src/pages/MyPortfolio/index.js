
import React, { useEffect } from 'react';
import { selectUser } from "../../store/addCoin/selectors";
import {fetchUserCoins, deleteCoin} from "../../store/userCoin/actions"
import { selectCoins } from "../../store/userCoin/selectors"
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';





export default function CoinDetails() {
    const dispatch = useDispatch()
    const users = useSelector(selectUser)
    const coins = useSelector(selectCoins)


     useEffect(() => {
    dispatch(fetchUserCoins(users.id));
  }, [dispatch, users.id]);

  const onDelete = (coinId) => {
   
    dispatch(deleteCoin(coinId));
  };

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
                  <th scope="col">$ Amount</th>
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
                        <td>{parseFloat(coin.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td>{coin.userCoins.amount}</td>
                        <td>${parseFloat(coin.price * coin.userCoins.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td> <Button  onClick= {() => onDelete(coin.id)}>Delete Coin</Button> </td>
                        </tr>
                   </tbody>
                  
                )    
            })
        )}
        <td>Total Amount </td>
          <td></td>
          <td></td>
          <td></td>
          <td>${Array.isArray(coins) ? 
            (coins.map(c=>parseInt(c.price * c.userCoins.amount)).reduce((sum,val)=> sum+val,0 )) : (null) }</td>
          
         
        </table>
        
        </div>
        </div>

)  
}
