import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CustomButton from "../Button";
import "../../App.css";

const Login = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.username === values.username && u.password === values.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setSnackbar({ open: true, message: "Login successful!", severity: "success" });

        if (values.username === "Admin") {
          user.role = "Admin";
          localStorage.setItem("currentUser", JSON.stringify(user));
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      
      } else {
        setSnackbar({ open: true, message: "Invalid username or password!", severity: "error" });
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {["username", "password"].map((field) => (
        <div key={field} style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={formik.values[field]}
            onChange={formik.handleChange}
          />
        </div>
      ))}
      <CustomButton type="submit">Login</CustomButton>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;
