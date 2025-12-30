import axios from "axios";
import config from "./config";

export async function loginUser(email, password) {
  const URL = config.BASE_URL + "/users/signin";
  const body = { email, password };
  const response = await axios.post(URL, body);
  return response.data;
}

export async function registerUser(name, email, password, mobile) {
  const URL = config.BASE_URL + "/users/signup";
  const body = { name, email, password, mobile };
  const response = await axios.post(URL, body);
  return response.data;
}

export async function getCourses(token) {
  const URL = config.BASE_URL + "/courses/all-courses";
  const headers = { token };
  const response = await axios.get(URL, { headers });
  return response.data;
}

export async function getProfile(token) {
  const URL = config.BASE_URL + "/users/profile";  // 🆕 "/profile" add kar
  const headers = { token };
  const response = await axios.get(URL, { headers });
  return response.data;
}
