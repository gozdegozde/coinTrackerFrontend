import React from 'react'
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom'
import { Col, Container } from "react-bootstrap";
export default function Welcome() {
    return(
        <div>
         <Container className= "mt-5"  as={Col} >
            <div style={{ 
      backgroundImage: `url("https://cointracking.info/assets/img/landing/Devices.png")`,
       height:'830px',
       width:'950px'
      
    }}>
        <Form as={Col} md={{ span: 6, offset: 8 }}>
            <br/> <br/> <br/><br/> <br/> <br/>
            <h1> Welcome to CoinTracker</h1> 
             <Form.Label >
                 <ul>
                    <li>You can see all lists of coins and you can track that all coins on your portfolio page. </li>
                    <li>You can the add amount of coins that you have. </li>
                    <li>You can see the total amount of money that you have. </li>

                 </ul>

            </Form.Label>
            <p>Do you have an account? <Link to ="/login">Login</Link> or <Link to ="/signup">Sign Up</Link> </p>
        </Form>
          
        </div>
        </Container>  
        
         </div>
    )
}