import { useHistory } from "react-router-dom";
import "./EducatorSideBar.css";

export default function EducatorSideBar(props) {
  console.log("props in educator sidebar", props);
  const history = useHistory();
  console.log("history in educator side bar", JSON.stringify(history));
  const user = history.location.state.user;

  const handleCreateNewCoursesClick = () => {
    history.push({ pathname: "/educator-createnewcourses", state: { user } });
  };

  return (
    <section className="sidebar">
      <div className="profile">
        <div className="message">Hello</div>
        <div className="overlay"></div>
      </div>
      <div className="educator-btn-group">
        <button onClick={handleCreateNewCoursesClick}>Create new courses</button>
      </div>
    </section>);
} 