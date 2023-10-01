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
      photo: photo
  });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const updateAdminById = async (id, username, email, password, photo) => {
  try {
    const res = await axios.put(`${baseURL}admin/updateAdmin/${id}`, {
      username: username,
      email: email,
      password: password,
      photo: photo
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
export const deleteAdmin = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}admin/deleteAdmin/${id}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

//home
export const getHomePhotos = async () => {
  try {
    const res = await axios.get(`${baseURL}home/getHomePhotos`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getHomePhotoById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}home/getPhotoById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const updateHomePhotoById = async (id, photo, titleOfPhoto) => {
  try {
    const res = await axios.put(`${baseURL}home/updateHomePhoto/${id}`, {
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
    const res = await axios.get(`${baseURL}photographer/getPhotographerInfo`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getPhotographerInfoById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}photographer/getPhotographerInfoById/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};


export const updatePhotographerInfo = async (id, bio, phoneNumber, photo) => {
  try {
    const res = await axios.put(`${baseURL}photographer/updatePhotographerInfo/${id}`, {
        bio: bio,
        phoneNumber: phoneNumber,
        photo: photo,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

// export const getAllBookings = async () => {
//   try {
//     const res = await axios.get(`${baseURL}booking/getAllBookings`);
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const createABookingForAPhotoshoot = async (data) => {
//   try {
//     const res = await axios.post(`${baseURL}booking/createABookingForAPhotoshoot`, { ...data });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const acceptABookingForAPhotoshoot = async (id, status) => {
//   try {
//     const res = await axios.put(`${baseURL}booking/acceptABookingForAPhotoshoot/${id}`, {
//       data: {
//         status: status,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const declineABookingForAPhotoshoot = async (id, status) => {
//   try {
//     const res = await axios.put(`${baseURL}booking/acceptABookingForAPhotoshoot/${id}`, {
//       data: {
//         status: status,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const deleteADeclinedBooking = async (id) => {
//   try {
//     const res = await axios.delete(
//       `${baseURL}booking/deleteADeclinedBooking/${id}`
//     );
//     return res;
//   } catch (error) {
//     return null;
//   }
// };


// export const getPhotoshoots = async () => {
//   try {
//     const res = await axios.get(`${baseURL}portfolio/getPhotoshoots`);
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const getPhotoshootById = async (id) => {
//   try {
//     const res = await axios.get(`${baseURL}portfolio/getPhotoshootById/${id}`);
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const createPhotoshoot = async (data) => {
//   try {
//     const res = await axios.post(`${baseURL}portfolio/createPhotoshoot`, { ...data });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const updatePhotoshoot = async (id, name, typeOfPhotosession, mainPhoto, arrayOfPhotos) => {
//   try {
//     const res = await axios.put(`${baseURL}portfolio/updatePhotoshoot/${id}`, {
//       data: {
//         name: name,
//         typeOfPhotosession: typeOfPhotosession,
//         mainPhoto: mainPhoto,
//         arrayOfPhotos: arrayOfPhotos,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };


// export const getTypesOfPhotoshoot = async () => {
//   try {
//     const res = await axios.get(`${baseURL}typesOfPhotoshoot/getTypesOfPhotoshoot`);
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const createTypesOfPhotoshoot = async (data) => {
//   try {
//     const res = await axios.post(`${baseURL}typesOfPhotoshoot/createTypeOfPhotoshoot`, { ...data });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
// export const updateTypesOfPhotoshoot = async (id, typeOfPhotosession, mainPhoto, text) => {
//   try {
//     const res = await axios.put(`${baseURL}typesOfPhotoshoot/updateTypeOfPhotoshoot/${id}`, {
//       data: {
//         typeOfPhotosession: typeOfPhotosession,
//         mainPhoto: mainPhoto,
//         text: text,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// };
