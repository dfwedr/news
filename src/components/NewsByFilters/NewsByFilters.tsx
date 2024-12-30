// import { getNews } from "../../api/apiNews";
import { TOTAL_PAGES } from "../../constant/constant";
import { useDebounce } from "../../helpers/hooks/useDebounce";
// import { useFetch } from "../../helpers/hooks/useFetch";
import { setFilters } from "../../slices/newsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
// import { NewsApiResponse, ParamsType } from "../../interfaces";
import { useGetNewsQuery } from "../../store/services/newsApi";
import NewsFilters from "../NewsFilters/NewsFilters";
import NewsList from "../NewsList/NewsList";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper";
import styles from "./styles.module.css";

const NewsByFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.news.filters);
  const debounceKeywords = useDebounce(filters.keywords as any, 1500);

  // const { data, isLoading } = useFetch<NewsApiResponse, ParamsType>(getNews, {
  //   ...filters,
  //   keywords: debounceKeywords,
  // });
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
      <PaginationWrapper
        top
        bottom
        currentPage={filters.page_number}
        totalPages={TOTAL_PAGES}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
