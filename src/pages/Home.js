import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Registration</h1>
      <CustomButton onClick={() => navigate("/login")}>Login</CustomButton>
      <CustomButton onClick={() => navigate("/register")} color="secondary">
        Register
      </CustomButton>
    </div>
  );
};

export default Home;
