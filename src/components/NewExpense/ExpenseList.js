import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseList.module.css";

const ExpenseList = ({ expenses, onRemove, isLoading }) => {
  return (
    <div className={classes["expense-container"]}>
      {!isLoading && expenses.length !== 0 && (
        <table>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.eid}>
                <td>
                  <ExpenseItem
                    id={expense.eid}
                    iname={expense.iname}
                    price={expense.price}
                    // type={expense.type}
                    onRemove={onRemove}
                  />
                </td>
                <td>
                  <i
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                    onClick={onRemove.bind(null, expense.eid, expense.price)}
                  >
                    clear
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <p>Loading...</p>}
      {expenses.length === 0 && !isLoading && <p>No items added</p>}
    </div>
  );
};

export default ExpenseList;
