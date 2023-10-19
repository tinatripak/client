import axios from "axios";

const baseURL = "http://localhost:8000/";

export const loginUser = async (inputValue) => {
  try {
    const res = await axios.post(
      `${baseURL}login`,
      {
        ...inputValue,
      },
      {
        withCredentials: true,
      }
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

//admin
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

//home
export const getAllHomePhotos = async () => {
  try {
    const res = await axios.get(`${baseURL}home/getAllHomePhotos`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getHomePhotoById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}home/getHomePhotoById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const updateHomePhotoById = async (id, photo) => {
  try {
    const res = await axios.put(`${baseURL}home/updateHomePhotoById/${id}`, {
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

// bio
export const getPhotographers = async () => {
  try {
    const res = await axios.get(`${baseURL}photographer/getPhotographers`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getPhotographerById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}photographer/getPhotographerById/${id}`
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
export const updatePhotographerById = async (id, bio, phoneNumber, photo) => {
  try {
    const res = await axios.put(
      `${baseURL}photographer/updatePhotographerById/${id}`,
      {
        bio: bio,
        phoneNumber: phoneNumber,
        photo: photo,
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

//types
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

//photoshoots

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

//bookings

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${baseURL}booking/getAllBookings`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}booking/getBookingById/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Resource could not be found!");
    } else {
      console.log(err.message);
    }
  }
};
export const createBooking = async (
  name,
  email,
  message,
  photoTypeId,
  date,
  startTime,
  endTime
) => {
  try {
    const res = await axios.post(`${baseURL}booking/createBooking`, {
      name: name,
      email: email,
      message: message,
      photoTypeId: photoTypeId,
      date: date,
      startTime: startTime,
      endTime: endTime,
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
export const acceptBookingById = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/acceptBookingById/${id}`, {
      status: status,
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
export const declineBookingById = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/declineBookingById/${id}`, {
      status: status,
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
export const deleteDeclinedBookingById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}booking/deleteDeclinedBookingById/${id}`
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
export const verifyBooking = async (uniqueString) => {
  try {
    const res = await axios.put(
      `${baseURL}booking/verifyBooking/${uniqueString}`
    );
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      console.log("Booking could not be found!");
    } else {
      console.log(err.message);
    }
  }
};

//questions

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

export const answerToQuestion = async ( id, email, question, answer) => {
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
