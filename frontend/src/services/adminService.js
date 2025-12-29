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
