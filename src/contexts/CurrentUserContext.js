import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get('/dj-rest-auth/user/');
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      handleMount();
    }, []);

    useMemo(() => {
      // Request Interceptor
      axiosReq.interceptors.request.use(
        async (config) => {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Response Interceptor
      axiosRes.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (error.response?.status === 401 && !originalRequest._retry && shouldRefreshToken()) {
            originalRequest._retry = true;
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              const { data } = await axios.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
              localStorage.setItem('authToken', data.access);
              localStorage.setItem('refreshToken', data.refresh);
              setTokenTimestamp(data);
              axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
              originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
              return axios(originalRequest);
            } catch (err) {
              setCurrentUser(null);
              removeTokenTimestamp();
              navigate('/signin');
            }
          }
          return Promise.reject(error);
        }
      );
    }, [navigate]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};
