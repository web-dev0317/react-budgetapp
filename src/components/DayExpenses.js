import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";
import { EXPENSES } from "../endpoints-prod";
import { useHttp } from "../hooks/use-http";

import classes from "./DayExpenses.module.css";

const DayExpenses = () => {
  const params = useParams();
  const { date } = params;
  const authCtx = useContext(AuthContext);
  const { jwt, uid } = authCtx;
  const { sendRequest: getExpensesForGivenDay, isLoading, error } = useHttp();
  const [expenses, setExpenses] = useState([]);

  let tableElems = [];
  let sum = 0;

  expenses.forEach((e) => {
    sum += e.price;
    tableElems.push(
      <tbody key={e.eid}>
        <tr>
          <td>{e.iname}</td>
          <td>{e.price}</td>
          {/* <td>{e.type}</td> */}
        </tr>
      </tbody>
    );
  });

  useEffect(() => {
    // console.log("days expenses fetch");
    let isActive = true;
    const getExpenses = async () => {
      const query = `uid=${uid}&jwt=${jwt}`;
      const data = await getExpensesForGivenDay({
        url: `${EXPENSES}/${date}?${query}`,
      });
      if (!data.isSuccess) return;
      if (!isActive) return;
      setExpenses(data.expenses);
    };
    getExpenses();
    return () => {
      isActive = false;
    };
  }, [uid, jwt, getExpensesForGivenDay, date]);

  return (
    <div className="center">
      <div className={classes["f-container"]}>
        <p>Total spent on {date.replaceAll(" ", "/")} :</p>
        <p className="figure">Rs. {sum}</p>
      </div>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (Rs.)</th>
            {/* <th>Type</th> */}
          </tr>
        </thead>
        {expenses.length !== 0 && tableElems}
      </table>
      {isLoading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DayExpenses;
