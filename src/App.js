import React, { useContext, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import classes from './App.module.css';

import { AuthContext } from './contexts/auth-context';

const Wrapper = React.lazy(() => import('./components/Wrapper'));
const MainGridWrapper = React.lazy(() =>
  import('./components/MainGrid/MainGridWrapper')
);
const AddExpense = React.lazy(() =>
  import('./components/NewExpense/AddExpense')
);
const Login = React.lazy(() => import('./components/Login'));
const DayExpenses = React.lazy(() => import('./components/DayExpenses'));

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.app}>
      <Navbar />
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <Suspense fallback={''}>
              <Wrapper
                component={
                  <Suspense fallback={''}>
                    <MainGridWrapper />
                  </Suspense>
                }
              />
            </Suspense>
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/addexpense">
            <Suspense fallback={''}>
              <Wrapper
                component={
                  <Suspense fallback={''}>
                    <AddExpense />
                  </Suspense>
                }
              />
            </Suspense>
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/expenses/:date">
            <Suspense fallback={''}>
              <DayExpenses />
            </Suspense>
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Suspense fallback={''}>
            <Login />
          </Suspense>
        )}
        {authCtx.isLoggedIn && (
          <Route path="*">
            <Redirect to="/" />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
