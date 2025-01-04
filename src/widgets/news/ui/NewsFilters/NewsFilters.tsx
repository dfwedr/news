import { IFilters } from "@/shared/interfaces";
import styles from "./styles.module.css";
import Slider from "@/features/slider/ui/Slider/Slider";
import { setFilters } from "@/entities/news/model/newsSlice";
import { useAppDispatch } from "@/app/appStore";
import { Categories } from "@/features/categories";
import { Search } from "@/features/search";
import { CategoriesType } from "@/entities/category";

interface Props {
  filters: IFilters;
  categories: CategoriesType[];
}

const NewsFilters = ({ filters, categories }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filters}>
      {categories ? (
        <Slider>
          <Categories
            categories={categories}
            setSelectedCategory={(category) => dispatch(setFilters({ key: "category", value: category }))}
            selectedCategory={filters.category}
          />
        </Slider>
      ) : null}
      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => dispatch(setFilters({ key: "keywords", value: keywords }))}
      />
    </div>
  );
};

export default NewsFilters;
