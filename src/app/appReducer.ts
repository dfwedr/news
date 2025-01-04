import { newsApi } from "@/entities/news/api/newsApi";
import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "@/entities/news/model/newsSlice";
import { CategoriesApi } from "@/entities/category/api/categoriesApi";

export const rootReducer = combineReducers({
  news: newsReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [CategoriesApi.reducerPath]: CategoriesApi.reducer,
});
