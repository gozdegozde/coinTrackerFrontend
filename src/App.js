import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home"
import CoinDetails from "./pages/CoinDetails"
import MyPortfolio from "./pages/MyPortfolio"

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Welcome from "./components/Welcome";



function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        
        <Route exact path="/" component={Welcome} />
        <Route path="/home" component={Home} />
        <Route path="/portfolio" component={MyPortfolio} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/:ids" component={CoinDetails}/>
       
      </Switch>
      <footer>
        <div className="footer-copyright text-center py-3"> 
          <a href="https://nomics.com">Crypto Market Cap & Pricing Data Provided By Nomics.</a>
        </div>
      </footer>
       
    </div>
  );
}

export default App;
