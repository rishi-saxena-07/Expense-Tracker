import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import TopExpenses from "../TopExpenses/TopExpenses";
import Transactions from "../Transactions/Transactions";
import styles from "./Home.module.css";

const Home = () => {
  const defaultExpense = [
    {
      id: 0,
      title: "Samosa",
      price: 150,
      category: "food",
      date: new Date("2024-03-20"),
    },
    {
      id: 1,
      title: "Movie",
      price: 300,
      category: "entertainment",
      date: new Date("2024-03-21"),
    },
    {
      id: 2,
      title: "Train",
      price: 50,
      category: "travel",
      date: new Date("2024-03-22"),
    },
  ];

  const [mainBalance, setMainBalance] = useState(5000);
  const [currentBalance, setCurrentBalance] = useState(mainBalance);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  const updateCategoryData = () => {
    let foodExpense = 0,
      entertainmentExpense = 0,
      travelExpense = 0;

    expenses.forEach((expense) => {
      if (expense.category === "food") foodExpense += parseInt(expense.price);
      if (expense.category === "entertainment")
        entertainmentExpense += parseInt(expense.price);
      if (expense.category === "travel")
        travelExpense += parseInt(expense.price);
    });

    const updatedCategoryData = [];

    if (foodExpense > 0) {
      updatedCategoryData.push({
        name: "Food",
        value: Number(foodExpense),
      });
    }

    if (entertainmentExpense > 0) {
      updatedCategoryData.push({
        name: "Entertainment",
        value: Number(entertainmentExpense),
      });
    }

    if (travelExpense > 0) {
      updatedCategoryData.push({
        name: "Travel",
        value: Number(travelExpense),
      });
    }

    updatedCategoryData.sort((a, b) => b.value - a.value); // Sorting in descending order

    setCategoryData(updatedCategoryData);

    return;
  };

  useEffect(() => {
    if (expenses.length !== 0) {
      updateCategoryData();
    }
  }, [expenses]);

  const updateTotalExpenses = () => {
    let total = 0;

    expenses.map((expense) => (total += parseInt(expense.price)));

    setTotalExpenses(total);
  };

  useEffect(() => {
    if (expenses) {
      updateTotalExpenses();
    }
  }, [expenses]);

  useEffect(() => {
    const updatedBalance = mainBalance - totalExpenses;

    setCurrentBalance(updatedBalance);
  }, [totalExpenses]);

  return (
    <div className={styles.home}>
      <h1 className={styles.appHeading}>Expense Tracker</h1>

      {/* Dashboard Component */}
      <Dashboard
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
        mainBalance={mainBalance}
        setMainBalance={setMainBalance}
        totalExpenses={totalExpenses}
        expenses={expenses}
        setExpenses={setExpenses}
        categoryData={categoryData}
      />

      {/* Transaction and TopExpenses Component */}
      <div className={styles.transactionsAndExpenses}>
        <Transactions
          expenses={expenses}
          setExpenses={setExpenses}
          currentBalance={currentBalance}
        />
        <TopExpenses categoryData={categoryData} />
      </div>
    </div>
  );
};

export default Home;
