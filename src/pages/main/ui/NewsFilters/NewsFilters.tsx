import { IFilters } from "@/shared/interfaces";
import styles from "./styles.module.css";
import Slider from "@/features/slider/ui/Slider/Slider";
import { setFilters } from "@/entities/news/model/newsSlice";
import { useAppDispatch } from "@/app/appStore";
import { useGetCategoriesQuery } from "@/entities/category/api/categoriesApi";
import { Categories } from "@/features/categories";
import { Search } from "@/features/search";

interface Props {
  filters: IFilters;
}

const NewsFilters = ({ filters }: Props) => {
  const { data: dataCategories } = useGetCategoriesQuery(null);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filters}>
      {dataCategories ? (
        <Slider>
          <Categories
            categories={dataCategories.categories}
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
