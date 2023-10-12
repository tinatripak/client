import axios from "axios";

const baseURL = "http://localhost:4000/";

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
  } catch (error) {
    return null;
  }
};

//admin
export const getAllAdmins = async () => {
  try {
    const res = await axios.get(`${baseURL}admin/getAllAdmins`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const getAdminById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}admin/getAdminById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const createAnAdmin = async (username, email, password, photo) => {
  try {
    const res = await axios.post(`${baseURL}admin/createAnAdmin`, {
      username: username,
      email: email,
      password: password,
      photo: photo,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const updateAdminById = async (id, username, email, password, photo) => {
  try {
    const res = await axios.put(`${baseURL}admin/updateTheAdmin/${id}`, {
      username: username,
      email: email,
      password: password,
      photo: photo,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deleteAdmin = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}admin/deleteTheAdmin/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

//home
export const getHomePhotos = async () => {
  try {
    const res = await axios.get(`${baseURL}home/getAllHomePhotos`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getHomePhotoById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}home/getHomePhotoById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const updateHomePhotoById = async (id, photo) => {
  try {
    const res = await axios.put(`${baseURL}home/updateHomePhotoById/${id}`, {
      photo: photo,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

// bio
export const getPhotographerInfo = async () => {
  try {
    const res = await axios.get(`${baseURL}photographer/getPhotographerBio`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getPhotographerInfoById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}photographer/getPhotographerBioById/${id}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const updatePhotographerInfo = async (id, bio, phoneNumber, photo) => {
  try {
    const res = await axios.put(
      `${baseURL}photographer/updatePhotographerBioById/${id}`,
      {
        bio: bio,
        phoneNumber: phoneNumber,
        photo: photo,
      }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

//types
export const getAllTypesOfPhotography = async () => {
  try {
    const res = await axios.get(
      `${baseURL}typesOfPhotography/getAllTypesOfPhotography`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getTypeOfPhotographyById = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}typesOfPhotography/getTypeOfPhotographyById/${id}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getTypeOfPhotographyByName = async (name) => {
  try {
    const res = await axios.get(
      `${baseURL}typesOfPhotography/getTypeOfPhotographyByTypeName/${name}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const createOneTypeOfPhotography = async (
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  try {
    const res = await axios.post(
      `${baseURL}typesOfPhotography/createTypeOfPhotography`,
      {
        typeOfPhotography: typeOfPhotography,
        shootingDuration: shootingDuration,
        mainPhoto: mainPhoto,
        text: text,
      }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export const updateTypeOfPhotography = async (
  id,
  typeOfPhotography,
  shootingDuration,
  mainPhoto,
  text
) => {
  try {
    const res = await axios.put(
      `${baseURL}typesOfPhotography/updateTypeOfPhotographyById/${id}`,
      {
        typeOfPhotography: typeOfPhotography,
        shootingDuration: shootingDuration,
        mainPhoto: mainPhoto,
        text: text,
      }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deleteTypeOfPhotography = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}typesOfPhotography/deleteTypeOfPhotographyById/${id}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

//photoshoots

export const getPhotoshoots = async () => {
  try {
    const res = await axios.get(`${baseURL}portfolio/getPhotoshoots`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const getPhotoshootById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}portfolio/getPhotoshootById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getPhotoshootByName = async (name) => {
  try {
    const res = await axios.get(`${baseURL}portfolio/getPhotoshootByName/${name}`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const createPhotoshoot = async (
  name,
  photoTypeId,
  mainPhoto,
  arrayOfPhotos
) => {
  try {
    const res = await axios.post(`${baseURL}portfolio/createPhotoshoot`, {
      name: name,
      photoTypeId: photoTypeId,
      mainPhoto: mainPhoto,
      arrayOfPhotos: arrayOfPhotos,
    });
    return res.data;
  } catch (error) {
    return null;
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
      `${baseURL}portfolio/updatePhotoshootById/${id}`,
      {
        name: name,
        photoTypeId: photoTypeId,
        mainPhoto: mainPhoto,
        arrayOfPhotos: arrayOfPhotos,
      }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deletePhotoshootById = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}portfolio/deletePhotoshootById/${id}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

//bookings

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${baseURL}booking/getAllBookings`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const getTheBookingById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}booking/getTheBookingById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const createABooking = async (
  name,
  email,
  message,
  photoTypeId,
  date,
  startTime,
  endTime
) => {
  try {
    const res = await axios.post(`${baseURL}booking/createABooking`, {
      name: name,
      email: email,
      message: message,
      photoTypeId: photoTypeId,
      date: date,
      startTime: startTime,
      endTime: endTime
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const acceptTheBooking = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/acceptTheBooking/${id}`, {
      status: status,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const declineTheBookingF = async (id, status) => {
  try {
    const res = await axios.put(`${baseURL}booking/declineTheBooking/${id}`, {
      status: status,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deleteTheDeclinedBooking = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}booking/deleteTheDeclinedBooking/${id}`
    );
    return res;
  } catch (error) {
    return null;
  }
};
