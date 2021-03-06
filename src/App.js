import React,{useState,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import './StateProvider'
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import {auth} from './firebase'




function App() {
  
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);



  return (
    
      <Router>
        <div className="App">
          <Header/>


        <Switch>
          
          <Route path="/Checkout">
               
                <Checkout />
          </Route>
          <Route path="/login">
               
               <Login/>
          </Route>
        
          <Route path="/" >
                
                <Home   />
          </Route>

          


        </Switch>
        </div>
      </Router>
    
  );
}

export default App;
