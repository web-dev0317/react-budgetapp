import { useSelector } from "react-redux";
import classes from "./BudgetHistory.module.css";

const BudgetHistory = () => {
  const history = useSelector((state) => state.history);

  return (
    <div className={classes["budget-history"]}>
      <p style={{ fontWeight: "bolder" }}>Budget history</p>
      <div className={classes["table-container"]}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Month & Year</th>
              <th>Budget (Rs.)</th>
              <th>Savings (Rs.)</th>
              <th>Spent (Rs.)</th>
            </tr>
          </thead>
          {history.map((e) => (
            <tbody key={e.monthAndYear}>
              <tr>
                <td>{e.monthAndYear}</td>
                <td>{e.budget}</td>
                <td>{e.savings}</td>
                <td>{e.spent}</td>
              </tr>
            </tbody>
          ))}
        </table>
        {history.length === 0 && <p>No data available</p>}
      </div>
    </div>
  );
};

export default BudgetHistory;
