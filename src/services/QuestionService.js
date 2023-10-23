import axios from "axios";
import { baseURL } from "../constants";

export const getAllQuestions = async () => {
  try {
    const res = await axios.get(`${baseURL}question/getAllQuestions`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getQuestionById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}question/getQuestionById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const createQuestion = async (name, email, question) => {
  try {
    const res = await axios.post(`${baseURL}question/createQuestion`, {
      name: name,
      email: email,
      question: question,
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
export const deleteQuestionById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}question/deleteQuestionById/${id}`
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

export const answerToQuestion = async (id, email, question, answer) => {
  try {
    await axios.post(`${baseURL}question/answerToQuestion`, {
      id: id,
      email: email,
      question: question,
      answer: answer,
    });
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
