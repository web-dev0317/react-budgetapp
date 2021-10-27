import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Loader.module.css";

const portalElement = document.getElementById("loader");

const Loader = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} />,
        portalElement
      )}
      {ReactDOM.createPortal(<div className={classes.loader} />, portalElement)}
    </Fragment>
  );
};

export default Loader;
