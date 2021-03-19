import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseCard from "./CourseCard";


export default function EducatorCoursesList() {
  const history = useHistory();
  console.log("history in educator course", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email, id } = user;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/educator/${id}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div className="my-course">My Course</div>
      {courses.length ? (
        <CourseCard courses={courses} />
      ) : (
        <div>No Course</div>
      )}
    </div>
  );
}
