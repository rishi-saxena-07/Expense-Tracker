import styles from "./App.module.css";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  );
};

export default App;
