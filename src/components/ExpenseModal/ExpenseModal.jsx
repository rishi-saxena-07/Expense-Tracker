import { useState } from "react";
import Modal from "react-modal";
import styles from "./ExpenseModal.module.css";

const ExpenseModal = ({
  isOpen,
  setIsOpen,
  type,
  id,
  expenses,
  setExpenses,
}) => {
  let expense = {};
  if (id === expenses.length) {
    expense = {
      id: id,
      title: "",
      price: 0,
      category: "",
      date: null,
    };
  } else {
    expense = expenses[id];
  }

  const [formData, setFormData] = useState({
    title: expense.title || "",
    price: expense.price || 0,
    category: expense.category || "",
    date: expense.date ? expense.date.toISOString().split("T")[0] : "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (type === "Edit") {
      const updatedExpense = {
        ...expense,
        ...formData,
        date: new Date(formData.date),
      };

      const updatedExpenses = expenses.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      );

      setExpenses(updatedExpenses);
    } else {
      const newExpense = {
        ...formData,
        date: new Date(formData.date),
        id: id,
      };

      const updatedExpenses = [...expenses, newExpense];

      setExpenses(updatedExpenses);
    }

    closeModal();
  };

  return (
    <div className={styles.expenseModal}>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={`${type} Expense Modal`}
        className={styles.customModal}
      >
        <p className={styles.heading}>{`${type} Expenses`}</p>

        <div className={styles.expenseForm}>
          <div className={styles.inputGroups}>
            <input
              className={styles.inputBar}
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleChange}
            />
            <input
              className={styles.inputBar}
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroups}>
            <select
              className={styles.inputBar}
              id="expenseCategory"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select a Category
              </option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
            <input
              className={styles.inputBar}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroups}>
            <button
              className={styles.addOrEditBtn}
              onClick={handleSubmit}
            >{`${type} Expense`}</button>
            <button className={styles.cancelBtn} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseModal;
