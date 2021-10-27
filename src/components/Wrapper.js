import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth-context";
import { ModalContext } from "../contexts/modal-context";
import { DETAILS } from "../endpoints-prod";
import { today } from "../helpers/date-parser";
import { useHttp } from "../hooks/use-http";
import { wxmActions } from "../store/slices/wxm-slice";
import BudgetSetModal from "./BudgetSetModal";
import Loader from "./UI/Loader";

const Wrapper = ({ component }) => {
  const authCtx = useContext(AuthContext);
  const { uid, jwt } = authCtx;
  const { sendRequest: fetchDetails } = useHttp();
  const dispatch = useDispatch();
  const modalCtx = useContext(ModalContext);
  const { showModal } = modalCtx;
  const { isModalShown } = modalCtx.modalState;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSignUp = queryParams.get("isSignUp");

  const [isLoading, setIsLoading] = useState(true);
  const [canHide, setCanHide] = useState(true);

  useEffect(() => {
    // console.log("main content fetch");
    let isActive = true;
    const timeout = setTimeout(
      () => {
        const getDetails = async () => {
          const query = `?uid=${uid}&jwt=${jwt}`;
          const data = await fetchDetails({
            url: DETAILS + query,
          });
          if (!data.isSuccess) return;
          if (!isActive) return;
          setIsLoading(false);
          const reqObj = data.details;
          reqObj.tableEntries.reverse();
          reqObj.history.reverse();
          if (reqObj.budget === 0) {
            setCanHide(false);
            showModal();
          }
          dispatch(
            wxmActions.setBudget({ type: "SET", amount: reqObj.budget })
          );
          dispatch(
            wxmActions.setSavings({ type: "SET", amount: reqObj.savings })
          );
          dispatch(wxmActions.setSpent({ type: "SET", amount: reqObj.spent }));
          const te = reqObj.tableEntries.find((e) => e.date === today());
          if (te) {
            dispatch(
              wxmActions.setSpentToday({ type: "SET", amount: te.spent })
            );
          }
          dispatch(
            wxmActions.setTableEntries({
              type: "SET",
              tableEntries: reqObj.tableEntries,
            })
          );
          dispatch(
            wxmActions.setHistory({
              type: "SET",
              history: reqObj.history,
            })
          );
          setIsLoading(false);
        };
        getDetails();
      },
      isSignUp ? 3000 : 0
    );
    return () => {
      clearTimeout(timeout);
      isActive = false;
      dispatch(wxmActions.resetAll());
    };
  }, [dispatch, fetchDetails, uid, jwt, showModal, isSignUp]);

  return (
    <Fragment>
      {isModalShown && (
        <BudgetSetModal canHide={canHide} setCanHide={setCanHide} />
      )}
      {component}
      {isLoading && <Loader />}
      <br />
      <br />
    </Fragment>
  );
};

export default Wrapper;
