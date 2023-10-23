import axios from "axios";
import { baseURL } from "../constants";

export const getAllHomePhotos = async () => {
  try {
    const res = await axios.get(`${baseURL}home/getAllHomePhotos`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getHomePhotoById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}home/getHomePhotoById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const updateHomePhotoById = async (id, photo) => {
  try {
    const res = await axios.put(`${baseURL}home/updateHomePhotoById/${id}`, {
      photo: photo,
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