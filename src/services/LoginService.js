import axios from "axios";
import { baseURL } from "../constants";

export const userVerification = async () => {
  try {
    const res = await axios.post(`${baseURL}`, {}, { withCredentials: true });
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const loginUser = async (inputValue) => {
  try {
    const res = await axios.post(
      `${baseURL}login`,
      {
        ...inputValue,
      },
      {
        withCredentials: true,
      }
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
