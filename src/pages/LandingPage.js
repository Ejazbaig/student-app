import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import CourseList from "./CourseSection/CourseList";
import Learning from "./Learning/Learning";
import UserDetails from "./Learning/UserDetails";
import "../App.css";

const LandingPage = () => {
  const [myLearningCourses, setMyLearningCourses] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.enrolledCourses) {
      const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
      const enrolled = storedCourses.filter((course) =>
        currentUser.enrolledCourses.includes(course.courseId)
      );
      setMyLearningCourses(enrolled);
    }
  }, []);

  return (
    <div style={{ display: "flex", maxHeight: "100vh" }}>
      <Sidebar />
      <div className="main-content" style={{ padding: "20px", width: "100%" }}>
        <div className="course-section">
          <CourseList
            myLearningCourses={myLearningCourses}
            setMyLearningCourses={setMyLearningCourses}
          />
        </div>
        <div className="learning-section">
          <UserDetails />
          <hr/>
          <Learning myLearningCourses={myLearningCourses} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
