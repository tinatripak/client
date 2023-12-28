import { handleApiRequest } from "../utils/apiRequest";
import { baseURL } from "../constants";

export const getAllQuestions = async () => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}question/getAllQuestions`,
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};

export const getQuestionById = async (id) => {
  const requestConfig = {
    method: "get",
    url: `${baseURL}question/getQuestionById/${id}`,
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};

export const createQuestion = async (name, email, question) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}question/createQuestion`,
    data: {
      name,
      email,
      question,
    },
  };

  return handleApiRequest(requestConfig);
};

export const deleteQuestionById = async (id) => {
  const requestConfig = {
    method: "delete",
    url: `${baseURL}question/deleteQuestionById/${id}`,
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};

export const answerToQuestion = async (id, email, question, answer) => {
  const requestConfig = {
    method: "post",
    url: `${baseURL}question/answerToQuestion`,
    data: {
      id,
      email,
      question,
      answer,
    },
    withCredentials: true,
  };

  return handleApiRequest(requestConfig);
};
