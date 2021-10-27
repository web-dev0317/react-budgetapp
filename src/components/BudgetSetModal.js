import Modal from "./UI/Modal";
import classes from "./BudgetSetModal.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useContext, useState, useRef, useEffect } from "react";

import { wxmActions } from "../store/slices/wxm-slice";
import { ModalContext } from "../contexts/modal-context";
import { useHttp } from "../hooks/use-http";
import { AuthContext } from "../contexts/auth-context";
import { monthYear } from "../helpers/date-parser";
import { NUMBERS } from "../endpoints-prod";

const BudgetSetModal = ({ canHide, setCanHide }) => {
  const modalCtx = useContext(ModalContext);
  const { hideModal } = modalCtx;
  const authCtx = useContext(AuthContext);
  const { jwt, uid } = authCtx;
  const { sendRequest: updateNumbers } = useHttp();
  const type = modalCtx.modalState.modalType;
  const { budget, spent, savings } = useSelector((state) => {
    return {
      budget: state.budget,
      spent: state.spent,
      savings: state.savings,
    };
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const disabled = isSubmitted ? "disabled" : "";

  let text = "";
  if (type === "RESET" || type === "SET") {
    text = "Enter the budget";
  } else if (type === "ADD") {
    text = "Enter the amount to be added";
  } else if (type === "DED") {
    text = "Enter the amount to be deducted";
  }

  const amountRef = useRef();
  const dispatch = useDispatch();

  //have to update before unmount
  const update = async (props) => {
    await updateNumbers({
      url: NUMBERS,
      method: "PUT",
      body: {
        uid,
        jwt,
        ...props,
      },
    });
    hideModal();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const amount = +amountRef.current.value;

    if (amount !== 0) {
      setIsSubmitted(true);
      if (type === "RESET") {
        const props = {
          budget,
          spent,
          savings,
          amount,
          type,
        };
        dispatch(
          wxmActions.setBudget({ type: "SET", amount: amount + savings })
        );
        dispatch(
          wxmActions.setSavings({ type: "SET", amount: amount + savings })
        );
        dispatch(wxmActions.setSpent({ type: "SET", amount: 0 }));
        const history = {
          budget,
          savings,
          spent,
          monthAndYear: monthYear(),
        };
        dispatch(wxmActions.setHistory({ type: "ADD", history }));
        update(props);
      } else {
        const props = {
          amount,
          type,
        };
        dispatch(wxmActions.setBudget({ type, amount }));
        dispatch(wxmActions.setSavings({ type, amount }));
        update(props);
      }
    }
  };

  useEffect(() => {
    return () => {
      setCanHide(true);
    };
  }, [setCanHide]);

  return (
    <Modal hideModal={modalCtx.hideModal} canHide={canHide}>
      <form
        className={classes["modal-form"]}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <div className="input-field">
          <input
            ref={amountRef}
            type="number"
            name="amount"
            id="amount"
            min="1"
            required
          />
          <label htmlFor="amount">{text}</label>
        </div>
        <button type="submit" className={`btn blue ${disabled}`}>
          OK
        </button>
      </form>
    </Modal>
  );
};

export default BudgetSetModal;
