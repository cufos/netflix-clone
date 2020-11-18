import React from "react";
import * as ROUTES from "./constants/routes";
import { Home, Signin, Signup, Browse } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.BROWSE} component={Browse} />
        <Route path={ROUTES.SIGN_IN} component={Signin} />
        <Route path={ROUTES.SING_UP} component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
