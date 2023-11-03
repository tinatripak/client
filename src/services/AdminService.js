import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllAdmins = async () => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}admin/getAllAdmins`,
  };

  return handleApiRequest(requestConfig);
};

export const getAdminById = async (id) => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}admin/getAdminById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const createAdmin = async (username, email, password, photo) => {
  const requestConfig = {
    method: 'post',
    url: `${baseURL}admin/createAdmin`,
    data: {
      username,
      email,
      password,
      photo,
    },
  };

  return handleApiRequest(requestConfig);
};

export const updateAdminById = async (id, username, email, password, photo) => {
  const requestConfig = {
    method: 'put',
    url: `${baseURL}admin/updateAdminById/${id}`,
    data: {
      username,
      email,
      password,
      photo,
    },
  };

  return handleApiRequest(requestConfig);
};

export const deleteAdminById = async (id) => {
  const requestConfig = {
    method: 'delete',
    url: `${baseURL}admin/deleteAdminById/${id}`,
  };

  return handleApiRequest(requestConfig);
};
