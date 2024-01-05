import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllBookings = async () => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}booking/getAllBookings`,
  };

  return handleApiRequest(requestConfig);
};

export const getBookingById = async (id) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}booking/getBookingById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const createBooking = async (
  name,
  email,
  phone,
  message,
  photoTypeId,
  date,
  startTime,
  endTime,
) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}booking/createBooking`,
    data: {
      name,
      email,
      phone,
      message,
      photoTypeId,
      date,
      startTime,
      endTime,
    },
  };

  return handleApiRequest(requestConfig);
};

export const acceptBookingById = async (id) => {
  const requestConfig = {
    withCredentials: true,
    method: "put",
    url: `${baseURL}booking/acceptBookingById/${id}`,
  };
  console.log(process.env.TOKEN_KEY)

  return handleApiRequest(requestConfig);
};

export const declineBookingById = async (id) => {
  const requestConfig = {
    withCredentials: true,
    method: "put",
    url: `${baseURL}booking/declineBookingById/${id}`,
  };
  console.log(process.env.TOKEN_KEY)

  return handleApiRequest(requestConfig);
};

export const deleteBookingById = async (id) => {
  const requestConfig = {
    method: "delete",
    url: `${baseURL}booking/deleteBookingById/${id}`,
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};

export const verifyBooking = async (uniqueString) => {
  const requestConfig = {
    method: "put",
    url: `${baseURL}booking/verifyBooking/${uniqueString}`,
  };

  return handleApiRequest(requestConfig);
};
