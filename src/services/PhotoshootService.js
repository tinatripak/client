import axios from "axios";
import { baseURL } from "../constants";

export const getPhotoshoots = async () => {
  try {
    const res = await axios.get(`${baseURL}photoshoot/getPhotoshoots`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getPhotoshootById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}photoshoot/getPhotoshootById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getPhotoshootByName = async (name) => {
  try {
    const res = await axios.get(
      `${baseURL}photoshoot/getPhotoshootByName/${name}`
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
export const createPhotoshoot = async (
  name,
  photoTypeId,
  mainPhoto,
  arrayOfPhotos
) => {
  try {
    const res = await axios.post(`${baseURL}photoshoot/createPhotoshoot`, {
      name: name,
      photoTypeId: photoTypeId,
      mainPhoto: mainPhoto,
      arrayOfPhotos: arrayOfPhotos,
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
export const updatePhotoshootById = async (
  id,
  name,
  photoTypeId,
  mainPhoto,
  arrayOfPhotos
) => {
  try {
    const res = await axios.put(
      `${baseURL}photoshoot/updatePhotoshootById/${id}`,
      {
        name: name,
        photoTypeId: photoTypeId,
        mainPhoto: mainPhoto,
        arrayOfPhotos: arrayOfPhotos,
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
export const deletePhotoshootById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}photoshoot/deletePhotoshootById/${id}`
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