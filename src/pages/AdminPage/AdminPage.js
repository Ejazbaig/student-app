import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const Admin = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleUniqueCourse = (storedCourses) => {
    const courseIds = storedCourses.map((course) => course.courseId);
    return courseIds.includes(formik.values.courseId);
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      courseId: "",
      courseTitle: "",
      courseDescription: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.courseId) errors.courseId = "Course ID is required";
      if (!values.courseTitle) errors.courseTitle = "Course Title is required";
      if (!values.courseDescription) errors.courseDescription = "Course Description is required";
      return errors;
    },
    onSubmit: (values) => {
      const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
      if (handleUniqueCourse(storedCourses)) {
        setSnackbar({ open: true, message: "Course ID already exists", severity: "error" });
      } else {
        const newCourse = { ...values };
        storedCourses.push(newCourse);
        localStorage.setItem("courses", JSON.stringify(storedCourses));
        setSnackbar({ open: true, message: "Course added successfully!", severity: "success" });
      }
      formik.resetForm();
    },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Create New Course</h2>
        <Button className="logout-button" variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <form onSubmit={formik.handleSubmit} className="admin-form">
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label="Course ID"
            name="courseId"
            value={formik.values.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.courseId && Boolean(formik.errors.courseId)}
            helperText={formik.touched.courseId && formik.errors.courseId}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label="Course Title"
            name="courseTitle"
            value={formik.values.courseTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.courseTitle && Boolean(formik.errors.courseTitle)}
            helperText={formik.touched.courseTitle && formik.errors.courseTitle}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label="Course Description"
            name="courseDescription"
            value={formik.values.courseDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.courseDescription && Boolean(formik.errors.courseDescription)}
            helperText={formik.touched.courseDescription && formik.errors.courseDescription}
            multiline
            rows={4}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Admin;
