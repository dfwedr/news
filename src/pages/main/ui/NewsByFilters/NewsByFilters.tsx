import NewsList from "@/widgets/news/ui/NewsList/NewsList";
import { TOTAL_PAGES } from "@/shared/constant/constant";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { setFilters } from "@/entities/news/model/newsSlice";
import NewsFilters from "../NewsFilters/NewsFilters";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/app/appStore";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";
import Pagination from "@/features/pagination/ui/Pagination/Pagination";

const NewsByFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.news.filters);
  const debounceKeywords = useDebounce(filters.keywords as any, 1500);

  const { data, isLoading } = useGetNewsQuery({ ...filters, keywords: debounceKeywords });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      dispatch(setFilters({ key: "page_number", value: filters.page_number + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      dispatch(setFilters({ key: "page_number", value: filters.page_number - 1 }));
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setFilters({ key: "page_number", value: pageNumber }));
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} />
      <Pagination
        top
        bottom
        currentPage={filters.page_number}
        totalPages={TOTAL_PAGES}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </Pagination>
    </section>
  );
};

export default NewsByFilters;
