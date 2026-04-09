import { getAxiosInstance } from "./Api";

export function getCategories(params) {
  return getAxiosInstance({}).get("/api/v1/categories", {
    params: params,
  });
}