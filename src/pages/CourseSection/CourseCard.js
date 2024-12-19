import React from "react";
import onlineCourse from "../../assets/online-course.png";
import CircularProgress from '@mui/material/CircularProgress';

const CourseCard = ({ course, handleEnroll, isEnrolled, type }) => {
  return (
    <div className="course-card">
      <img src={onlineCourse} alt={course.courseTitle} style={{ width: "20%", height: "100%", objectFit: "cover" }} />
      <div className="course-content">
        <div>
          <h4 style={{ marginBottom: "10px", marginTop: "0px" }}>{course.courseTitle}</h4>
          <p style={{ color: "#555" }}>{course.courseDescription}</p>
          {type !== "learning"&&
          <button
            onClick={() => handleEnroll(course)}
            disabled={isEnrolled}
            style={{
              padding: "10px 20px",
              backgroundColor: isEnrolled ? "#ddd" : "#007bff",
              color: isEnrolled ? "#666" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isEnrolled ? "not-allowed" : "pointer",
            }}
          >
            {isEnrolled ? "Enrolled" : "Enroll"}
          </button>
          }
        </div>
        <div>
          {type === "learning" && <CircularProgress variant="determinate" value={Math.ceil(Math.random() * 100)} />}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
