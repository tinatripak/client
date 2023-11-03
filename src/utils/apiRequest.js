import axios from "axios";

export const handleApiRequest = async (requestConfig) => {
  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Request failed with status code:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("Request made but no response received");
      console.error("Request config:", error.config);
    } else {
      console.error("Error while setting up the request:", error.message);
    }

    throw error;
  }
};
