import classes from "./MainGridWrapper.module.css";

import Budget from "./Budget";
import Glimpse from "./Glimpse";
import DatewiseExpenses from "./DatewiseExpenses";
import BudgetHistory from "./BudgetHistory";

const MainGridWrapper = () => {
  return (
    <div className={classes.grid}>
      <Budget />
      <Glimpse />
      <DatewiseExpenses />
      <BudgetHistory />
    </div>
  );
};

export default MainGridWrapper;
