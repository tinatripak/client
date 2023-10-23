import axios from "axios";
import { baseURL } from "../constants";

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${baseURL}booking/getAllBookings`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}booking/getBookingById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
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
  try {
    const res = await axios.post(`${baseURL}booking/createBooking`, {
      name: name,
      email: email,
      message: message,
      photoTypeId: photoTypeId,
      date: date,
      startTime: startTime,
      endTime: endTime,
    });
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const acceptBookingById = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/acceptBookingById/${id}`, {
      status: status,
    });
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const declineBookingById = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/declineBookingById/${id}`, {
      status: status,
    });
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const deleteDeclinedBookingById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}booking/deleteDeclinedBookingById/${id}`
    );
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const verifyBooking = async (uniqueString) => {
  try {
    const res = await axios.put(
      `${baseURL}booking/verifyBooking/${uniqueString}`
    );
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Booking could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
