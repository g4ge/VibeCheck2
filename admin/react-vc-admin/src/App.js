import { Switch, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import User from "pages/User";
import Post from "pages/Post";

import Header from "components/Header";
import Footer from "components/Footer";

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

            <Route path="/user">
              <User />
            </Route>

            <Route path="/post">
              <Post />
            </Route>
          </Switch>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
