import axios from "axios";
import { baseURL } from "../constants";

export const getAllAdmins = async () => {
  try {
    const res = await axios.get(`${baseURL}admin/getAllAdmins`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getAdminById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}admin/getAdminById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const createAdmin = async (username, email, password, photo) => {
  try {
    const res = await axios.post(`${baseURL}admin/createAdmin`, {
      username: username,
      email: email,
      password: password,
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
export const updateAdminById = async (id, username, email, password, photo) => {
  try {
    const res = await axios.put(`${baseURL}admin/updateAdminById/${id}`, {
      username: username,
      email: email,
      password: password,
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
export const deleteAdminById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}admin/deleteAdminById/${id}`);
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
