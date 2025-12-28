import config from "./config";
import axios from "axios";

export async function loginUser(email, password) {
  const URL = config.BASEURL + "/users/signin";
  const body = { email, password };

  const res = await axios.post(URL, body);
  return res.data;
}

export async function registerUser(name, email, password, mobile) {
  const URL = config.BASEURL + "/users/signup";
  const body = { name, email, password, mobile };

  const res = await axios.post(URL, body);
  return res.data;
}

export async function getUserProfile(token) {
  const URL = config.BASEURL + "users/profile";

  const res = await axios.get(URL, {
    headers: {
      token: token,
    },
  });

  return res.data;
}

export async function updateProfile(token, name, email, mobile) {
  const URL = config.BASEURL + "users/update";
  const body = { name, email, mobile };

  const res = await axios.put(URL, body, {
    headers: {
      token: token,
    },
  });

  return res.data;
}
