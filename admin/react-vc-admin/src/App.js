import { Switch, Route } from "react-router-dom";

// components
import Header from "components/Header";
import Footer from "components/Footer";

// main
import MainDashboard from "pages/MainDashboard";

// user
import UserDashboard from "pages/UserDashboard";
import User from "pages/User";
import UserAccount from "pages/UserAccount";
import UserFollowing from "pages/UserFollowing";
import UserTime from "pages/UserTime";

// post
import PostDashboard from "pages/PostDashboard";


function App() {
  return (
    <div className="page-container">
      <Header />
      
      <div className="content-wrap">
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <MainDashboard />
            </Route>

            <Route exact path="/user">
              <UserDashboard />
            </Route>

            <Route exact path="/user/:id">
              <User />
            </Route>

            <Route exact path="/user/:id/account">
              <UserAccount />
            </Route>

            <Route exact path="/user/:id/following">
              <UserFollowing />
            </Route>

            <Route exact path="/user/:id/time">
              <UserTime />
            </Route>

            <Route exact path="/post">
              <PostDashboard />
            </Route>
          </Switch>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
