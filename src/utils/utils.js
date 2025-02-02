import { jwtDecode } from 'jwt-decode';
import { axiosReq } from '../api/axiosDefaults';

/**
 * Fetches more data from the given resource's next URL and updates the resource state.
 * This function makes an HTTP GET request to the 'next' URL of the resource to fetch additional data.
 * It then updates the resource state by appending unique new results to the existing results and updating
 * the 'next' URL with the new one from the fetched data.
 * If any error occurs during the fetch, it will be caught and handled silently.
 */

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

/**
 * Sets the refresh token timestamp in local storage.
 * This function decodes the refresh token from the provided data to extract
 * its expiration time and stores it in the local storage under the key
 * 'refreshTokenTimestamp'. This timestamp can later be used to determine
 * whether the token should be refreshed.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
};

/**
 * Checks whether the refresh token should be refreshed.
 * This function checks whether the timestamp for refreshing the token
 * is set in the local storage. If it is, it means the token should be refreshed.
 * If not, it means the token doesn't need refreshing.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

/**
 * Removes the refresh token timestamp from local storage.
 * This function is used to remove the refresh token timestamp from the local storage
 * after the user has logged out. If the timestamp is removed, it means the token doesn't
 * need refreshing.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};