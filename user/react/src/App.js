import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "libs/Context";
import { getAuthUserProfile } from "data/AuthUserRepository";

import Landing from "pages/Landing";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";
import Posts from "pages/Posts";
import Search from "pages/Search";
import Footer from "components/Footer";;

function App() {
  const [authUser, setAuthUser] = useState(getAuthUserProfile())

  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      <div className="page-container">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>
          
          <Route path="/posts">
            <Posts />
          </Route>

          <Route path="/search">
            <Search />
          </Route>
        </Switch>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
