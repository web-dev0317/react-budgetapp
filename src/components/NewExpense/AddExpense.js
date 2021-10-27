import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";

import { wxmActions } from "../../store/slices/wxm-slice";

import AddExpenseForm from "./AddExpenseForm";
import classes from "./AddExpense.module.css";
import ExpenseList from "./ExpenseList";
import { today } from "../../helpers/date-parser";
import BudgetSetModal from "../BudgetSetModal";

import { ModalContext } from "../../contexts/modal-context";
import { useHttp } from "../../hooks/use-http";
import { AuthContext } from "../../contexts/auth-context";
import { EXPENSE, EXPENSES, TABLEENTRY } from "../../endpoints-prod";

const AddExpense = () => {
  const modalCtx = useContext(ModalContext);
  const { isModalShown } = modalCtx.modalState;
  const { sendRequest } = useHttp();
  const { sendRequest: getExpenses, isLoading } = useHttp();
  const authCtx = useContext(AuthContext);
  const { jwt, uid } = authCtx;
  const { expenses, spentToday } = useSelector((state) => {
    return {
      expenses: state.expenses,
      spentToday: state.spentToday,
    };
  });

  const dispatch = useDispatch();

  // const [date, setDate] = useState(yyyyMMdd());
  // const [isDifferentDate, setIsDifferentDate] = useState(false);
  // const [spentOnGivenDate, setSpentOnGivenDate] = useState(0);

  useEffect(() => {
    // console.log("expenses fetch");
    let isActive = true;
    const getExpensesOfTheDay = async () => {
      const query = `?uid=${uid}&jwt=${jwt}&date=${today()}`;
      const data = await getExpenses({
        url: EXPENSES + query,
      });
      if (!data.isSuccess) return;
      if (!isActive) return;
      dispatch(
        wxmActions.setExpenses({ type: "SET", expenses: data.expenses })
      );
    };
    getExpensesOfTheDay();

    return () => {
      isActive = false;
      dispatch(wxmActions.resetExpenses());
    };
  }, [uid, jwt, getExpenses, dispatch]);

  const updateEntry = async (spent) => {
    await sendRequest({
      url: TABLEENTRY,
      method: "PUT",
      body: {
        uid,
        jwt,
        spent,
        date: today(),
        // date: yyyyMMddToddMMyyyy(date),
      },
    });
  };

  const addExpense = (expense) => {
    updateEntry(spentToday + expense.price);

    dispatch(wxmActions.setExpenses({ type: "ADD", expense }));
    dispatch(wxmActions.setSpent({ type: "ADD", amount: expense.price }));
    dispatch(wxmActions.setSpentToday({ type: "ADD", amount: expense.price }));
    // if (convertedDate === today()){
    //   dispatch(
    //     wxmActions.setSpentToday({ type: "ADD", amount: expense.price })
    //   );
    // }
    // else{
    //   setSpentOnGivenDate((prevState) => prevState + expense.price);
    // }
    dispatch(wxmActions.setSavings({ type: "DED", amount: expense.price }));
    dispatch(
      wxmActions.setTableEntries({
        type: "ADD",
        date: today(),
        // date: yyyyMMddToddMMyyyy(date),
        amount: expense.price,
      })
    );

    sendRequest({
      url: EXPENSE,
      body: {
        ...expense,
        uid,
        jwt,
        date: today(),
      },
      method: "POST",
    });
  };

  const removeExpense = (eid, amount) => {
    updateEntry(spentToday - amount);

    dispatch(wxmActions.setExpenses({ type: "REMOVE", eid }));
    dispatch(wxmActions.setSpent({ type: "DED", amount }));
    dispatch(wxmActions.setSpentToday({ type: "DED", amount }));
    // if (convertedDate === today()){
    //   dispatch(wxmActions.setSpentToday({ type: "DED", amount }));}
    //   else{
    //     setSpentOnGivenDate((prevState) => prevState - amount);
    //   }
    dispatch(wxmActions.setSavings({ type: "ADD", amount }));
    dispatch(
      wxmActions.setTableEntries({
        type: "DED",
        date: today(),
        // date: yyyyMMddToddMMyyyy(date),
        amount,
      })
    );

    sendRequest({
      url: EXPENSE,
      body: {
        eid,
        uid,
        jwt,
        amount,
      },
      method: "DELETE",
    });
  };

  // const dateChangeHandler = async (e) => {
  //   const dateInput = e.target.value;
  //   const d = yyyyMMddToddMMyyyy(dateInput);
  //   if (convertedDate !== today()) {
  //     setIsDifferentDate(true);
  //   } else {
  //     setIsDifferentDate(false);
  //   }
  //   if (date === dateInput) {
  //     return;
  //   }
  //   setDate(date);
  //   setSpentOnGivenDate(0);
  //   const query = `?uid=${uid}&jwt=${jwt}&date=${d}`;
  //   const data = await getExpenses({
  //     url: EXPENSES + query,
  //   });
  //   if (!data.isSuccess) return;
  //   const total = data.expenses.reduce(
  //     (total, expense) => total + expense.price,
  //     0
  //   );
  //   setSpentOnGivenDate(total);
  //   dispatch(wxmActions.setExpenses({ type: "SET", expenses: data.expenses }));
  // };

  return (
    <div className={classes["ae-container"]}>
      {/* <input
        type="date"
        name="date"
        id="date"
        className={`browser-default ${classes.date}`}
        value={date}
        onChange={dateChangeHandler}
      /> */}
      <p>
        {/* Spent {convertedDate === today() ? "today : " : `on ${convertedDate}`} */}
        Spent today :
      </p>
      <p className={classes["spent-today"]}>
        {/* Rs. {!isDifferentDate ? spentToday : spentOnGivenDate} */}
        Rs. {spentToday}
      </p>
      <AddExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        onRemove={removeExpense}
        isLoading={isLoading}
      />
      {isModalShown && <BudgetSetModal />}
    </div>
  );
};

export default AddExpense;
