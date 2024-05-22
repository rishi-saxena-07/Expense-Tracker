import CategoryPieChart from "./CategoryPieChart/CategoryPieChart";
import styles from "./Dashboard.module.css";
import Expenses from "./Expenses/Expenses";
import WalletBalance from "./WalletBalance/WalletBalance";

const Dashboard = ({
  currentBalance,
  setCurrentBalance,
  mainBalance,
  setMainBalance,
  categoryData,
  expenses,
  setExpenses,
  totalExpenses,
}) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.walletAndExpenses}>
        <WalletBalance
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
          mainBalance={mainBalance}
          setMainBalance={setMainBalance}
        />
        <Expenses
          expenses={expenses}
          totalExpenses={totalExpenses}
          setExpenses={setExpenses}
        />
      </div>

      <CategoryPieChart categoryData={categoryData} />
    </div>
  );
};

export default Dashboard;
