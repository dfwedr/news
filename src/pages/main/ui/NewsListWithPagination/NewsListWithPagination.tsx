import { TOTAL_PAGES } from "@/shared/constant/constant";
import Pagination from "@/features/pagination/ui/Pagination/Pagination";
import { NewsList } from "@/widgets/news";
import { IFilters } from "@/shared/interfaces";
import { INews } from "@/entities/news";
import { usePaginationNews } from "../../utils/hooks/usePaginationNews";
import { useAppDispatch } from "@/app/appStore";
import { useNavigate } from "react-router-dom";
import { setCurrentNews } from "@/entities/news/model/newsSlice";

interface Props {
  filters: IFilters;
  news: INews[];
  isLoading: boolean;
}

const NewsListWithPagination = ({ filters, news, isLoading }: Props) => {
  const { handleNextPage, handlePreviousPage, handlePageClick } = usePaginationNews(filters);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateTo = (news: INews) => {
    dispatch(setCurrentNews(news));
    navigate(`/news/${news.id}`);
  };
  return (
    <Pagination
      top
      bottom
      currentPage={filters.page_number}
      totalPages={TOTAL_PAGES}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      handlePageClick={handlePageClick}
    >
      <NewsList
        type="item"
        direction="column"
        isLoading={isLoading}
        news={news}
        viewNewsSlot={(news: INews) => (
          <p style={{ cursor: "pointer" }} onClick={() => navigateTo(news)}>
            view more...
          </p>
        )}
      />
    </Pagination>
  );
};

export default NewsListWithPagination;
