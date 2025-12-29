import config from "./config";
import axios from "axios";

export async function getAllCourses(token) {
  const URL = config.BASEURL + "courses/all-active-courses";

  const res = await axios.get(URL, {
    headers: {
      token: token, 
    },
  });

  return res.data;
}
