import classes from "./ExpenseItem.module.css";

const ExpenseItem = ({ iname, price, type }) => {
  return (
    <div>
      <span className={classes.iname}>{iname}</span>
      <span className={classes.price + " " + classes["inline-block"]}>
        Rs. {price}
      </span>
      {/* <span className={classes.type + ' ' + classes['inline-block']}>
        {type}
      </span> */}
    </div>
  );
};

export default ExpenseItem;
