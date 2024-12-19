import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { format } from "date-fns";
import "./CourseList.css";

const CourseList = ({ myLearningCourses, setMyLearningCourses }) => {
  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    setCourses(storedCourses);

    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const handleEnroll = (course) => {
    if (!currentUser) {
      alert("Please log in to enroll in a course!");
      return;
    }

    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...(currentUser.enrolledCourses || []), course.courseId],
    };

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = allUsers.map((u) =>
      u.username === currentUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setMyLearningCourses((prev) => [...prev, course]);

    setSnackbar({ visible: true, message: `Successfully enrolled in ${course.courseTitle}` });
    setTimeout(() => setSnackbar({ visible: false, message: "" }), 3000);
  };

  function getFormattedDate() {
    const date = new Date();
    const formattedDate = format(date, "do MMMM yyyy");
    return formattedDate;
  }

  return (
    <div className="course-list-main-container">
      <h2>Course Activity</h2>
      <h4 style={{ color: "#0c669e" }}>{getFormattedDate()}</h4>
      <div className="course-list-container">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.courseId}
              style={{
                marginBottom: "20px",
                padding: "15px",
              }}
            >
              <CourseCard
                course={course}
                handleEnroll={handleEnroll}
                isEnrolled={myLearningCourses?.some(
                  (c) => c.courseId === course.courseId
                )}
              />
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>

      {snackbar.visible && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default CourseList;
