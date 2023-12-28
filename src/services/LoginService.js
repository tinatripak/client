import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const userVerification = async () => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}`,
    data: {},
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};

export const loginUser = async (inputValue, cookies) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}login`,
    data: {
      ...inputValue,
    },
    withCredentials: true,
    cookies,
  };

  return handleApiRequest(requestConfig);
};

export const logoutUser = async (cookies) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}logout`,
    withCredentials: true,
    cookies,
  };

  return handleApiRequest(requestConfig);
};
