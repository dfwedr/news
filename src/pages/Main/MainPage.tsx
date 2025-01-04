import styles from "./styles.module.css";
import LatestNews from "./ui/LatestNews/LatestNews";
import NewsByFilters from "./ui/NewsByFilters/NewsByFilters";

const MainPage = () => {
  return (
    <main className={styles.main}>
      <LatestNews />
      <NewsByFilters />
    </main>
  );
};

export default MainPage;
