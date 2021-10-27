import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  jwt: null,
  uid: null,
  logIn: (jwt, uid) => {},
  logOut: () => {},
  setJwt: () => {},
  setUid: () => {},
});

const AuthContextProvider = (props) => {
  const initialJwt = localStorage.getItem('jwt');
  const initialUid = localStorage.getItem('uid');

  const [jwt, setJwt] = useState(initialJwt);
  const [uid, setUid] = useState(initialUid);
  const isLoggedIn = !!jwt;

  const logIn = (newJwt, newUid) => {
    setJwt(newJwt);
    setUid(newUid);
    localStorage.setItem('jwt', newJwt);
    localStorage.setItem('uid', newUid);
  };

  const logOut = () => {
    setJwt();
    setUid();
    localStorage.removeItem('jwt');
    localStorage.removeItem('uid');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        jwt,
        uid,
        logIn,
        logOut,
        setJwt,
        setUid,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
