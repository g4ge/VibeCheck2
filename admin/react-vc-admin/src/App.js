import { Switch, Route } from "react-router-dom";

import Dashboard from "pages/Dashboard";

function App() {
  return (
    <div className="page-container">
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
