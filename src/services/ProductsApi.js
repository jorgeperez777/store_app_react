import { getAxiosInstance } from "./Api";

export function getProducts(params) {
  return getAxiosInstance({}).get("/api/v1/products", {
    params: params,
  });
}
export function getProduct(params) {
  return getAxiosInstance({}).get("/api/v1/product", {
    params: params,
  });
}
