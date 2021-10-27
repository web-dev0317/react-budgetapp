import { useContext } from "react";
import { useSelector } from "react-redux";

import { ModalContext } from "../../contexts/modal-context";
import { monthYear } from "../../helpers/date-parser";

import classes from "./Budget.module.css";

const Budget = () => {
  const modalCtx = useContext(ModalContext);
  const { budget, history } = useSelector((state) => {
    return {
      budget: state.budget,
      history: state.history,
    };
  });

  const resetHandler = () => {
    if (history.length !== 0 && history[0].monthAndYear === monthYear()) {
      alert("You can reset only after a month");
      return;
    }
    modalCtx.setModalType("RESET");
  };

  return (
    <div className={classes.budget}>
      <div>
        <p>Month's budget: </p>
        <p className="figure">Rs. {budget}</p>
      </div>
      <div>
        <button
          className="btn btn-floating green"
          onClick={() => modalCtx.setModalType("ADD")}
        >
          <i className="material-icons">add</i>
        </button>
        <button
          className="btn btn-floating orange"
          onClick={() => modalCtx.setModalType("DED")}
        >
          <i className="material-icons">remove</i>
        </button>
        <button className="btn btn-floating red" onClick={resetHandler}>
          <i className="material-icons">history</i>
        </button>
      </div>
    </div>
  );
};

export default Budget;
