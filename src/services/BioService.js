import axios from "axios";
import { baseURL } from "../constants";

export const getPhotographers = async () => {
  try {
    const res = await axios.get(`${baseURL}photographer/getPhotographers`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getPhotographerById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}photographer/getPhotographerById/${id}`
    );
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const updatePhotographerById = async (id, bio, phoneNumber, photo) => {
  try {
    const res = await axios.put(
      `${baseURL}photographer/updatePhotographerById/${id}`,
      {
        bio: bio,
        phoneNumber: phoneNumber,
        photo: photo,
      }
    );
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
