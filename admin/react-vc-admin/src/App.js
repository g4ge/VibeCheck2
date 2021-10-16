import { Switch, Route } from "react-router-dom";

// components
import Header from "components/Header";
import Footer from "components/Footer";

// main
import Dashboard from "pages/Dashboard";

// user
import UserManagement from "pages/UserManagement";
import User from "pages/User";
import UserAccount from "pages/UserAccount";
import UserFollowing from "pages/UserFollowing";
import UserTime from "pages/UserTime";

// post
import PostManagement from "pages/PostManagement";
import Posts from "pages/Posts";


function App() {
  return (
    <div className="page-container">
      <Header />
      
      <div className="content-wrap">
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/user">
              <UserManagement />
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
              <PostManagement />
            </Route>

            <Route exact path="/post/all">
              <Posts />
            </Route>
          </Switch>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
