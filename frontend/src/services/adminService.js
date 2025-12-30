import axios from "axios";
import config from "./config";

export async function addCourse(
  course_name,
  description,
  fees,
  start_date,
  end_date,
  video_expire_days
) {
  const URL = config.BASE_URL + "/courses/add";

  const token = sessionStorage.getItem("token"); // 👈 MUST exist

  return (
    await axios.post(
      URL,
      {
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days,
      },
      {
        headers: {
          token: token,
        },
      }
    )
  ).data;
}

export async function deleteCourses(course_id) {
  const URL = config.BASE_URL + "/courses/delete/:course_id";
  const token = sessionStorage.getItem("token");
  const result = await axios.delete(URL, token);
  return result.data;
}

export async function getAllVideoss(token) {
  const URL = config.BASE_URL + "/video/all-videos";

  const res = await axios.get(URL, {
    headers: {
      token: token,
    },
  });

  return res.data;
}
export async function addVideos(course_id, title, youtube_url, description) {
  const URL = config.BASE_URL + "/video/add";
  const token = sessionStorage.getItem("token");

  const response = await axios.post(
    URL,
    { course_id, title, youtube_url, description },
    {
      headers: {
        token: token,
      },
    }
  );

  return response.data;
}


export async function getStudents() {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(
    config.BASE_URL + "/admin/enrolledstudents",
    {
      headers: { token }
    }
  );

  return response.data;
}