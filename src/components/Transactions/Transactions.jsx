import { Fragment, useState } from "react";
import ExpenseCard from "./ExpenseCard/ExpenseCard";
import styles from "./Transactions.module.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Transactions = ({ expenses, setExpenses, currentBalance }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginateExpenses = (page, elementsPerPage) => {
    const startIndex = (page - 1) * elementsPerPage;
    const endIndex = Math.min(startIndex + elementsPerPage, expenses.length);
    return expenses.slice(startIndex, endIndex);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(expenses.length / elementsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const elementsPerPage = 3;
  const currentExpenses = paginateExpenses(currentPage, elementsPerPage);

  return (
    <div className={styles.transactions}>
      <p className={styles.heading}>
        <i>Recent Transactions</i>
      </p>

      <div className={styles.cardsFrame}>
        {expenses.length > 0 ? (
          <Fragment>
            {currentExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                expenses={expenses}
                setExpenses={setExpenses}
                currentBalance={currentBalance}
              />
            ))}

            <div className={styles.pagination}>
              <button className={styles.pageBtns} onClick={goToPreviousPage}>
                <BsArrowLeft size={16} />
              </button>
              <p className={styles.pageNumber}>{currentPage}</p>
              <button className={styles.pageBtns} onClick={goToNextPage}>
                <BsArrowRight size={16} />
              </button>
            </div>
          </Fragment>
        ) : (
          <p className={styles.noExpenses}>Add Expenses to Display them here</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
