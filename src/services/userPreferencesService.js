import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.EXTERNAL_API_BASE;

if (!BASE_URL) {
  throw new Error("Missing required environment variable: EXTERNAL_API_BASE");
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const formatAxiosError = (error, defaultMessage) => {
  if (error.response) {
    const status = error.response.status;
    const message =
      error.response.data?.message || `${defaultMessage} (${status})`;

    const err = new Error(message);
    err.status = status;
    return err;
  }

  if (error.request) {
    const err = new Error("No response received from external server");
    err.status = 503;
    return err;
  }

  const err = new Error(error.message || defaultMessage);
  err.status = 500;
  return err;
};

export const fetchUserPreferences = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }

    const response = await api.get(`/api/users/${userId}/preferences`);
    return response.data?.data || null;
  } catch (error) {
    throw formatAxiosError(error, "Failed to fetch user preferences");
  }
};
