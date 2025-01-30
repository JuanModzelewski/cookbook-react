import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const setTokenTimestamp = (data) => {
  try {
    const refreshToken = data?.refresh;
    const refreshTokenTimestamp = jwtDecode(refreshToken).exp;
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  return !!tokenTimestamp;
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};