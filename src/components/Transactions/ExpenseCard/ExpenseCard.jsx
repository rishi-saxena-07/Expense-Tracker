import styles from "./ExpenseCard.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import ExpenseModal from "../../ExpenseModal/ExpenseModal";

const ExpenseCard = ({
  expenseKey,
  expense,
  expenses,
  setExpenses,
  currentBalance,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const dateFormat = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${months[month]} ${day}, ${year}`;
  };

  const categoryPics = {
    food: "/Pizza_light.png",
    entertainment: "/Gift_light.png",
    travel: "/suitcase_light.png",
  };

  const handleDeleteExpense = () => {
    let updatedExpenses = expenses.filter((item) => item.id !== expense.id);

    updatedExpenses = updatedExpenses.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });
    console.log("updatedExpenses");
    console.log(updatedExpenses);

    setExpenses(updatedExpenses);
  };

  return (
    <div className={styles.expenseCard}>
      <div className={styles.iconAndTitle}>
        <img
          className={styles.categoryIcon}
          src={categoryPics[expense.category]}
          alt={`${expense.category} icon`}
        />

        <div className={styles.titleAndDate}>
          <p className={styles.title}>{expense.title}</p>

          <p className={styles.date}>{dateFormat(expense.date)}</p>
        </div>
      </div>

      <div className={styles.priceAndUpdate}>
        <p className={styles.price}>₹{expense.price}</p>

        <button className={styles.deleteBtn} onClick={handleDeleteExpense}>
          <CiCircleRemove size={25} />
        </button>

        <button className={styles.editBtn} onClick={openModal}>
          <MdModeEdit size={30} />
        </button>
      </div>

      {isOpen && (
        <ExpenseModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type={"Edit"}
          id={expense.id}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}
    </div>
  );
};

export default ExpenseCard;
