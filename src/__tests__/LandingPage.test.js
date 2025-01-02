import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../pages/LandingPage";

jest.mock("../pages/SideBar", () => () => <div>Mock Sidebar</div>);
jest.mock("../pages/CourseSection/CourseList", () => (props) => (
  <div>Mock CourseList - {props.myLearningCourses.length} courses</div>
));
jest.mock("../pages/Learning/Learning", () => (props) => (
  <div>Mock Learning - {props.myLearningCourses.length} courses</div>
));
jest.mock("../pages/Learning/UserDetails", () => () => <div>Mock UserDetails</div>);

describe("LandingPage Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders all child components correctly", () => {
    render(<LandingPage />);

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText(/Mock CourseList/i)).toBeInTheDocument();
    expect(screen.getByText("Mock UserDetails")).toBeInTheDocument();
    expect(screen.getByText(/Mock Learning/i)).toBeInTheDocument();
  });

  it("fetches enrolled courses for the current user", () => {
    const mockCurrentUser = {
      username: "testUser",
      enrolledCourses: ["course1", "course2"],
    };
    const mockCourses = [
      { courseId: "course1", title: "Course 1" },
      { courseId: "course2", title: "Course 2" },
      { courseId: "course3", title: "Course 3" },
    ];

    localStorage.setItem("currentUser", JSON.stringify(mockCurrentUser));
    localStorage.setItem("courses", JSON.stringify(mockCourses));

    render(<LandingPage />);

    expect(screen.getByText(/Mock CourseList - 2 courses/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Learning - 2 courses/i)).toBeInTheDocument();
  });
});
