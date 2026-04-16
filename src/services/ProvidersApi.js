import { getAxiosInstance } from "./Api";

export function getProviders(params) {
  return getAxiosInstance({}).get("/api/v1/providers", {
    params: params,
  });
}
export function getProvider(params) {
  return getAxiosInstance({}).get("/api/v1/provider", {
    params: params,
  });
}
