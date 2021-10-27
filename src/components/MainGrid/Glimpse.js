import { useSelector } from 'react-redux';

import classes from './Glimpse.module.css';

const Glimpse = () => {
  const { spent, spentToday, savings } = useSelector((state) => {
    return {
      spent: state.spent,
      spentToday: state.spentToday,
      savings: state.savings,
    };
  });
  const savingsClass = savings <= 0 ? classes.negative : classes.positive;

  return (
    <div className={classes.grid}>
      <div>
        <p>Total spent: </p>
        <p className="figure">Rs. {spent}</p>
        <p>Spent today: </p>
        <p className="figure">Rs. {spentToday}</p>
      </div>
      <div>
        <p>Savings: </p>
        <p className={`figure ${savingsClass}`}>Rs. {savings}</p>
      </div>
    </div>
  );
};

export default Glimpse;
