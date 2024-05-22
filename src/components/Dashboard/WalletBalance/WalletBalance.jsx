import { useState } from "react";
import styles from "./WalletBalance.module.css";
import Modal from "react-modal";

const WalletBalance = ({
  currentBalance,
  mainBalance,
  setMainBalance,
  setCurrentBalance,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newBalance, setNewBalance] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNewBalance("");
  };

  const handleChange = (e) => {
    setNewBalance(e.target.value);
  };

  const handleAddBalance = () => {
    setCurrentBalance(currentBalance + parseInt(newBalance));
    setMainBalance(mainBalance + parseInt(newBalance));
    closeModal();
  };

  return (
    <div className={styles.walletBalance}>
      <p>
        Wallet Balance: &nbsp;
        <span className={styles.balanceAmount}>₹{currentBalance}</span>
      </p>

      <button className={styles.addIncome} onClick={openModal}>
        + Add Income
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Add Balance Modal"
          className={styles.customModal}
        >
          <p className={styles.heading}>{`Add Balance`}</p>

          <div className={styles.addBalanceForm}>
            <input
              className={styles.inputBar}
              type="text"
              placeholder="Enter Amount"
              value={newBalance}
              onChange={handleChange}
            />
            <button className={styles.addBtn} onClick={handleAddBalance}>
              Add Balance
            </button>
            <button className={styles.cancelBtn} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WalletBalance;
