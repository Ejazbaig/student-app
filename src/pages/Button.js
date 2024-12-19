import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ type, onClick, children, variant = "contained", color = "primary" }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} type={type || "button"}>
      {children}
    </Button>
  );
};

export default CustomButton;
