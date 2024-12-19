import React from "react";
import CourseCard from "../CourseSection/CourseCard";
import "../CourseSection/CourseList.css";

const MyLearning = ({ myLearningCourses }) => {
  return (
    <div>
      <h3>My Learning</h3>
      {myLearningCourses.length > 0 ? (
        myLearningCourses.map((course) => (
          <div className="course-list-container"
            key={course.courseId}
          >
            <CourseCard course={course} type="learning" />
          </div>
        ))
      ) : (
        <p>You haven't enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default MyLearning;
