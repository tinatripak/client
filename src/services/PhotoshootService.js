import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getPhotoshoots = async () => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}photoshoot/getPhotoshoots`,
  };

  return handleApiRequest(requestConfig);
};

export const getPhotoshootById = async (id) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}photoshoot/getPhotoshootById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const getPhotoshootByName = async (name) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}photoshoot/getPhotoshootByName/${name}`,
  };

  return handleApiRequest(requestConfig);
};

export const createPhotoshoot = async (
  name,
  photoTypeId,
  mainPhoto,
  arrayOfPhotos,
) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}photoshoot/createPhotoshoot`,
    data: {
      name,
      photoTypeId,
      mainPhoto,
      arrayOfPhotos,
    },
  };

  return handleApiRequest(requestConfig);
};

export const updatePhotoshootById = async (
  id,
  name,
  photoTypeId,
  mainPhoto,
  arrayOfPhotos,
) => {
  const requestConfig = {
    method: "put",
    url: `${baseURL}photoshoot/updatePhotoshootById/${id}`,
    data: {
      name,
      photoTypeId,
      mainPhoto,
      arrayOfPhotos,
    },
  };

  return handleApiRequest(requestConfig);
};

export const deletePhotoshootById = async (id) => {
  const requestConfig = {
    method: "delete",
    url: `${baseURL}photoshoot/deletePhotoshootById/${id}`,
  };

  return handleApiRequest(requestConfig);
};
