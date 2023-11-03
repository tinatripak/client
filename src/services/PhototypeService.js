import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllTypesOfPhotography = async () => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}typeOfPhotography/getAllTypesOfPhotography`,
  };

  return handleApiRequest(requestConfig);
};

export const getTypeOfPhotographyById = async (id) => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}typeOfPhotography/getTypeOfPhotographyById/${id}`,
  };

  return handleApiRequest(requestConfig);
};

export const getTypeOfPhotographyByTypeName = async (name) => {
  const requestConfig = {
    method: 'get',
    url: `${baseURL}typeOfPhotography/getTypeOfPhotographyByTypeName/${name}`,
  };

  return handleApiRequest(requestConfig);
};

export const createTypeOfPhotography = async (
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  const requestConfig = {
    method: 'post',
    url: `${baseURL}typeOfPhotography/createTypeOfPhotography`,
    data: {
      typeOfPhotography,
      shootingDuration,
      mainPhoto,
      text,
    },
  };

  return handleApiRequest(requestConfig);
};

export const updateTypeOfPhotographyById = async (
  id,
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  const requestConfig = {
    method: 'put',
    url: `${baseURL}typeOfPhotography/updateTypeOfPhotographyById/${id}`,
    data: {
      typeOfPhotography,
      shootingDuration,
      mainPhoto,
      text,
    },
  };

  return handleApiRequest(requestConfig);
};

export const deleteTypeOfPhotographyById = async (id) => {
  const requestConfig = {
    method: 'delete',
    url: `${baseURL}typeOfPhotography/deleteTypeOfPhotographyById/${id}`,
  };

  return handleApiRequest(requestConfig);
};
