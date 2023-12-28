import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getPhotographers = async () => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}photographer/getPhotographers`,
  };

  return handleApiRequest(requestConfig);
};

export const getPhotographerById = async (id) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}photographer/getPhotographerById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const updatePhotographerById = async (id, bio, phoneNumber, photo) => {
  const requestConfig = {
    method: "put",
    url: `${baseURL}photographer/updatePhotographerById/${id}`,
    data: {
      bio,
      phoneNumber,
      photo,
    },
  };

  return handleApiRequest(requestConfig);
};
