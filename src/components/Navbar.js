import { Fragment, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const logOut = () => {
    authCtx.logOut();
  };

  return (
    <Fragment>
      <nav>
        <div className="container">
          <Link to="/" className="brand-logo">
            WXM
          </Link>
          <Link to="#" className="sidenav-trigger" data-target="mobile-links">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            {!authCtx.isLoggedIn && (
              <li>
                <Link to="/auth">Login / Sign up</Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <NavLink to="/addexpense">Add Expense</NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to="#" onClick={logOut}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-links">
        {!authCtx.isLoggedIn && (
          <li>
            <Link to="/auth">Login / Sign up</Link>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to="/addexpense">Add Expense</NavLink>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <Link to="#" onClick={logOut}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
