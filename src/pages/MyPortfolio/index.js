
import React, { useEffect, useState } from 'react';
import { selectUser } from "../../store/addCoin/selectors";
import {fetchUserCoins} from "../../store/userCoin/actions"
import { selectCoins } from "../../store/userCoin/selectors"
import { useDispatch, useSelector } from "react-redux";
import { appLoading } from '../../store/appState/actions';



export default function CoinDetails() {
    const dispatch = useDispatch()
    const users = useSelector(selectUser)
    const coins = useSelector(selectCoins)
     useEffect(() => {
    dispatch(fetchUserCoins(users.id));
  }, [dispatch, users.id]);

return(

    // !Array.isArray(allTables) ? (
//   <p>loading ...</p>
// ) : (
//   allTables.map((table) => {
    // <div>
    //       {JSON.stringify(coins)}
    // </div>

        <div> 
        User Name:  {users.name} <br/>
        
        {!Array.isArray(coins) ? (<div>Loading</div>) : (
            coins.map((coin)=> {
                return(
                    <div>
                        {coin.name}
                        {coin.price}
                        <img src={coin.logoUrl} alt={coin.id} width="45" height="45"/> 
                    </div>
                )        
            })
        )}
        </div>

      

        // {/* User Coins : {users.coins?.map(c=> {

        //     return (
        //         <div>
        //             <img src={c.logoUrl} alt={c.id} width="45" height="45"/> 
        //             {c.name} <br/>
        //             {c.price}
                   
        //         </div>
        //     )
        // })} */}

)  
}
