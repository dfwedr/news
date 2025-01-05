import { useAppSelector } from "@/app/appStore";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import NewsDetails from "@/entities/news/ui/NewsDetails/NewsDetails";

const NewsPage = () => {
  const currentNews = useAppSelector((state) => state.news.currentNews);
  if (!currentNews) {
    return (
      <div>
        <h1>Cannot find news</h1>
        <Link to="/">
          <button className={styles.back}>To main page</button>
        </Link>
      </div>
    );
  }
  return (
    <main className={styles.news}>
      <h1>{currentNews.title}</h1>
      <NewsDetails item={currentNews} />
    </main>
  );
};

export default NewsPage;
