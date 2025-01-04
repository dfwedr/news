import { useTheme } from "@/app/providers/ThemeProvider";
import styles from "./styles.module.css";
import { formatDate } from "@/shared/helpers/formatDate";
import { ThemeButton } from "@/features/theme";

const Header = () => {
  const { isDark } = useTheme();
  return (
    <header className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.info}>
        <h1 className={styles.title}>NEwWS FROM INTERNET!</h1>
        <p className={styles.date}>{formatDate(new Date())}</p>
      </div>
      <ThemeButton />
    </header>
  );
};

export default Header;
