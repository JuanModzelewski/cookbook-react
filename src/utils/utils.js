import { jwtDecode } from 'jwt-decode';
import { axiosReq } from '../api/axiosDefaults';

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
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new Error('Invalid token specified: must be a string');
    }
    const refreshTokenTimestamp = jwtDecode(refreshToken).exp;
    if (refreshTokenTimestamp) {
      localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
      console.log('Refresh token timestamp set:', refreshTokenTimestamp);
    } else {
      console.error('Invalid refresh token');
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }
};

export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem('refreshTokenTimestamp');
  const currentTime = Math.floor(Date.now() / 1000);
  console.log('Token timestamp:', tokenTimestamp);
  return tokenTimestamp && currentTime >= tokenTimestamp;
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
  console.log('Refresh token timestamp removed');
};


export const checkTokenValidity = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      console.log('Token has expired');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};
