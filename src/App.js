import React from "react";
import * as ROUTES from "./constants/routes";
import { Home, Signin, Signup, Browse } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import { useAuthListener } from "./hooks";

function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
          exact
        >
          <Home />
        </IsUserRedirect>

        <ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
          <Browse />
        </ProtectedRoute>


          <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
          
        >
          <Signup />
        </IsUserRedirect>

        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}
          exact
        >
          <Signin />
        </IsUserRedirect>

      <Route component={() => <h1>Page not found :(</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
