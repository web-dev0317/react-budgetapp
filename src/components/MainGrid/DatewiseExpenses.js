import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./DatewiseExpenses.module.css";

const DatewiseExpenses = () => {
  const tableEntries = useSelector((state) => state.tableEntries);
  const history = useHistory();

  return (
    <div className={classes["datewise-expenses"]}>
      <p style={{ fontWeight: "bolder" }}>Datewise expenses - Recent</p>
      <div className={classes["table-container"]}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount spent (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {tableEntries.map((e) => {
              return (
                <tr
                  key={e.date}
                  className={classes["clickable-rows"]}
                  onClick={() =>
                    history.push(`/expenses/${e.date.replaceAll("/", "%20")}`)
                  }
                >
                  <td>{e.date}</td>
                  <td>{e.spent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {tableEntries.length === 0 && <p>No data available</p>}
      </div>
    </div>
  );
};

export default DatewiseExpenses;
