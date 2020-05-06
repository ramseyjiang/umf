import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import HomePage from "../views/HomePage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RenderLoading from "./widgets/RenderLoading";

//lazy-loading each and every component might be an anti-pattern and it is up to the developers to wisely choose
//withholding unnecessary code during initial download and lazy-loading them on demand, all without sacrificing user experience.
const NotFound = lazy(() => import("../views/NotFound"));
const UserPage = lazy(() => import("../views/UserPage"));

const Routes = () => {
  const { authApi } = useAuthContext();

  const AuthRoute = ({ component, ...options }) => {
    if (component === Login && authApi.state.isLoggedIn) {
      return <Redirect to='/umf' />;
    } else if (component === Register && authApi.state.isLoggedIn) {
      return <Redirect to='/umf' />;
    } else if (component === Register && !authApi.state.isLoggedIn) {
      return <Route {...options} component={Register} />;
    } else {
      const finalComponent = authApi.state.isLoggedIn ? component : Login;

      return <Route {...options} component={finalComponent} />;
    }
  };

  return (
    <Suspense fallback={<RenderLoading />}>
      <Switch>
        <Route exact path='/umf' component={HomePage} />
        <AuthRoute path='/login' component={Login} />
        <AuthRoute path='/register' component={Register} />
        <Route path='/users' component={UserPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
