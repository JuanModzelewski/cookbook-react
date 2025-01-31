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
      console.log(error);
  }
};

export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  const currentTime = Math.floor(Date.now() / 1000);
  return tokenTimestamp && currentTime >= tokenTimestamp;
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};


export const storeToken = (token) => {
  try {
      localStorage.setItem('authToken', token);
  } catch (e) {
      console.error("Failed to store token", e);
  }
};

export const getToken = () => {
  try {
      return localStorage.getItem('authToken');
  } catch (e) {
      console.error("Failed to get token", e);
      return null;
  }
};

export const checkTokenValidity = (navigate) => {
  const token = getToken();
  if (!token) {
      navigate('/login');
  } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
          navigate('/login');
      }
  }
};