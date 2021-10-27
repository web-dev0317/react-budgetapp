import { Fragment, useRef } from "react";

import classes from "./AddExpenseForm.module.css";
import { v4 } from "uuid";

const AddExpenseForm = ({ onAdd }) => {
  const inameRef = useRef();
  const priceRef = useRef();
  // const typeRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const iname = inameRef.current.value;
    const price = +priceRef.current.value;
    // const type = typeRef.current.value;

    if (price !== 0) {
      const expense = {
        eid: v4(),
        iname,
        price,
        // type,
      };

      onAdd(expense);

      inameRef.current.value = "";
      priceRef.current.value = "";
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler} autoComplete="off">
        <table className={classes["form-table"]}>
          <tbody>
            <tr>
              <td>
                <div className="input-field">
                  <input
                    ref={inameRef}
                    type="text"
                    name="iname"
                    id="iname"
                    className={classes["expense-form-input"]}
                    required
                  />
                  <label htmlFor="iname">Item name</label>
                </div>
              </td>
              <td>
                <div className="input-field">
                  <input
                    ref={priceRef}
                    type="number"
                    name="price"
                    id="price"
                    min="1"
                    className={classes["expense-form-input"]}
                    required
                  />
                  <label htmlFor="price">Price (Rs.)</label>
                </div>
              </td>
              {/* <td>
                <select
                  className={"browser-default " + classes.select}
                  ref={typeRef}
                >
                  <option value="Grocery">Grocery</option>
                  <option value="Travel">Travel</option>
                  <option value="Medical">Medical</option>
                  <option value="NV">NV</option>
                  <option value="Others">Others</option>
                </select>
              </td> */}
            </tr>
          </tbody>
        </table>
        <div className={classes["expense-submit"]}>
          <button type="submit" className="btn btn-floating blue">
            <i className="material-icons">add</i>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddExpenseForm;
