import { IPaginationProps } from "../../interfaces";
import styles from "./styles.module.css";

const Pagination = ({
  totalPages,
  currentPage,
  handleNextPage,
  handlePreviousPage,
  handlePageClick,
}: IPaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button onClick={handlePreviousPage} className={styles.arrow} disabled={currentPage <= 1}>
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              onClick={() => {
                handlePageClick(index + 1);
              }}
              className={styles.pageNumber}
              key={index}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button onClick={handleNextPage} className={styles.arrow} disabled={currentPage >= totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
