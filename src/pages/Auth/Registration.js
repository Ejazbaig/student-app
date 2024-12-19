import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CustomButton from "../Button";
import "../../App.css";

const Registration = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const isUsernameTaken = users.some((user) => user.username === values.username);

      if (isUsernameTaken) {
        alert("Username already exists!");
        return;
      }

      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Register</h2>
      {["username", "password", "name", "phone", "email"].map((field) => (
        <div className="form-group" key={field} style={{ marginBottom: "16px" }}>
          <TextField
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
          />
        </div>
      ))}
      <CustomButton type="submit">Register</CustomButton>

      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert severity="success" variant="filled">
          User registered successfully! Redirecting to login...
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Registration;
