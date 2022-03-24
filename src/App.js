import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import LoginHeader from "./LoginHeader.js";
import Login from "./Login.js";
import RegisterHeader from "./RegisterHeader.js";
import Register from "./Register.js";
import HomeHeader from "./HomeHeader.js";
import './App.css';
import { auth } from './firebase.js';
import Sidebar from "./Sidebar.js";
import Sidebar2 from './Sidebar2.js';
import Posts from "./Posts.js";
import Game from "./game/Game.js";
import Profile from './Profile';
import Chat from "./Chat/Chat.js";
import NewsApp from "./News/NewsApp.js";


function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        setUser(authUser);
      } else {
        setUser(false);
      }
    })
  }, [])


  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path="/login">
              <LoginHeader />
              <Login />
          </Route>

          <Route path="/register">
              <RegisterHeader />
              <Register />
          </Route>

          <Route path="/:username/:uid">
            <HomeHeader user={user} />
            <Profile user={user} />
          </Route>

          <Route path="/news">
            <NewsApp user ={user} />
          </Route>

          <Route path="/chat">
            <Chat user = {user}/>
          </Route>

          <Route path="/game">
            <Game />
          </Route>


          <Route path="/">
            <HomeHeader user={user}/>
            <div className="app__page">
                <Sidebar user={user}/>
                <div className="app__posts">
                  <Posts user={user}/>
                </div>
                <Sidebar2 />
             </div>
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
