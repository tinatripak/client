import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllHomePhotos = async () => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}home/getAllHomePhotos`,
  };

  return handleApiRequest(requestConfig);
};

export const getHomePhotoById = async (id) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}home/getHomePhotoById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const updateHomePhotoById = async (id, photo) => {
  const requestConfig = {
    method: "put",
    url: `${baseURL}home/updateHomePhotoById/${id}`,
    data: {
      photo,
    },
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};
