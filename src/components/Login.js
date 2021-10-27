import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";
import { LOGIN, SIGNUP } from "../endpoints-prod";
import { useHttp } from "../hooks/use-http";

import classes from "./Login.module.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest } = useHttp();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const disabled = isLoading ? true : false;

  const toggleHandler = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  const login_signup = async (url, email, password) => {
    const data = await sendRequest({
      url,
      method: "POST",
      body: {
        email,
        password,
      },
    });
    if (data.isSuccess) {
      authCtx.logIn(data.jwt, data.uid);
      let location = "";
      if (isLogin) {
        location = "/";
      } else {
        location = "/?isSignUp=true";
      }
      history.replace(location);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (email.includes("@") && password.trim().length >= 6) {
      if (isLogin) {
        login_signup(LOGIN, email, password);
      } else {
        let confirmpassword = confirmpasswordRef.current.value;
        if (confirmpassword === password) {
          login_signup(SIGNUP, email, password);
        }
      }
    }
  };

  return (
    <div className={classes["login-form"]}>
      <form onSubmit={submitHandler}>
        <div className="input-field">
          <input ref={emailRef} type="text" name="email" id="email" required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            minLength="6"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        {!isLogin && (
          <div className="input-field">
            <input
              ref={confirmpasswordRef}
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              minLength="6"
              required
            />
            <label htmlFor="confirmpassword">Confirm password</label>
          </div>
        )}
        <div className="center">
          {error && <p className="red-text">{error}</p>}
          <button
            type="submit"
            className="btn green z-depth-0"
            disabled={disabled}
          >
            {!isLoading ? (isLogin ? "Login" : "Sign up") : ""}
            {isLoading && isLogin && "Logging in"}
            {isLoading && !isLogin && "Signing up"}
          </button>
          {!isLoading && (
            <div>
              <Link to="#" onClick={toggleHandler}>
                {isLogin ? "Sign up" : "Login"}
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
