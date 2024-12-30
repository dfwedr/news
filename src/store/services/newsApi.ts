// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesApiResponse, NewsApiResponse, ParamsType } from "../../interfaces";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
  // keepUnusedDataFor: 0,
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsApiResponse, ParamsType>({
      query: (params) => {
        const { page_number = 1, page_size = 10, category, keywords } = params || {};

        return {
          url: "search",
          params: {
            apiKey: API_KEY,
            page_number,
            page_size,
            category,
            keywords,
          },
        };
      },
    }),
    getLatestNews: builder.query<NewsApiResponse, null>({
      query: () => {
        return {
          url: "latest-news",
          params: {
            apiKey: API_KEY,
          },
        };
      },
    }),
    getCategories: builder.query<CategoriesApiResponse, null>({
      query: () => {
        return {
          url: "available/categories",
          params: {
            apiKey: API_KEY,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsQuery, useGetLatestNewsQuery, useGetCategoriesQuery } = newsApi;
