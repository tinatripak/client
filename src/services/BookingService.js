import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllBookings = async () => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}booking/getAllBookings`,
  };

  return handleApiRequest(requestConfig);
};

export const getBookingById = async (id) => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}booking/getBookingById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const createBooking = async (
  name,
  email,
  message,
  photoTypeId,
  date,
  startTime,
  endTime
) => {
  const requestConfig = {
    method: 'post',
    url: `${baseURL}booking/createBooking`,
    data: {
      name,
      email,
      message,
      photoTypeId,
      date,
      startTime,
      endTime,
    },
  };

  return handleApiRequest(requestConfig);
};

export const deleteDeclinedBookingById = async (id) => {
  const requestConfig = {
    method: 'delete',
    url: `${baseURL}booking/deleteDeclinedBookingById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const verifyBooking = async (uniqueString) => {
  const requestConfig = {
    method: 'put',
    url: `${baseURL}booking/verifyBooking/${uniqueString}`,
  };

  return handleApiRequest(requestConfig);
};
