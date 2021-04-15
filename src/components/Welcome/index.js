import React from 'react'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
export default function Welcome() {
    return(
        <div>Welcome
            <Link to= "/login"><Button>Login</Button></Link>
        </div>
    )
}