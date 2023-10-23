import axios from "axios";
import { baseURL } from "../constants";

export const getAllTypesOfPhotography = async () => {
  try {
    const res = await axios.get(
      `${baseURL}typeOfPhotography/getAllTypesOfPhotography`
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
export const getTypeOfPhotographyById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}typeOfPhotography/getTypeOfPhotographyById/${id}`
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
export const getTypeOfPhotographyByTypeName = async (name) => {
  try {
    const res = await axios.get(
      `${baseURL}typeOfPhotography/getTypeOfPhotographyByTypeName/${name}`
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
export const createTypeOfPhotography = async (
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  try {
    const res = await axios.post(
      `${baseURL}typeOfPhotography/createTypeOfPhotography`,
      {
        typeOfPhotography: typeOfPhotography,
        shootingDuration: shootingDuration,
        mainPhoto: mainPhoto,
        text: text,
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
export const updateTypeOfPhotographyById = async (
  id,
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  try {
    const res = await axios.put(
      `${baseURL}typeOfPhotography/updateTypeOfPhotographyById/${id}`,
      {
        typeOfPhotography: typeOfPhotography,
        shootingDuration: shootingDuration,
        mainPhoto: mainPhoto,
        text: text,
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
export const deleteTypeOfPhotographyById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}typeOfPhotography/deleteTypeOfPhotographyById/${id}`
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