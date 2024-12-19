import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "./Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const theme = createTheme();

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUserData(storedUser);
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.username === userData.username ? userData : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        {/* Profile heading with Edit icon positioned at top-right */}
        <div style={{ position: "relative" }}>
          <h2>Profile</h2>
          {!isEditing && (
          <IconButton
            onClick={handleEdit}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <EditIcon />
          </IconButton>
          )}
        </div>

        {/* User data form */}
        {Object.keys(userData).length > 0 ? (
          Object.keys(userData).map((key) => (
            <div key={key} style={{ marginBottom: "16px" }}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={userData[key]}
                onChange={(e) =>
                  setUserData({ ...userData, [key]: e.target.value })
                }
                InputProps={{
                  readOnly: key === "username" || !isEditing,
                }}
              />
            </div>
          ))
        ) : (
          <p>Loading user data...</p>
        )}

        {/* Save button */}
        {isEditing ? (
          <CustomButton onClick={handleSave}>Save</CustomButton>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default Profile;
