import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const menuItems = [
    { to: "/profile", label: "Profile" },
    { to: "/courses", label: "Courses" },
    { to: "/faqs", label: "FAQs" },
    { label: "Logout", onClick: handleLogout },
  ];

  return (
    <div style={{ width: "250px", padding: "20px", backgroundColor: "#f9fafc", borderRight: "1px solid #ddd", height: "92vh", maxHeight: "100vh" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>Student Dashboard</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ marginBottom: "16px" }}>
            {item.to ? (
              <Link
                to={item.to}
                style={{ textDecoration: "none", color: "#007bff", display: "block", padding: "10px 15px", borderRadius: "8px" }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                style={{ background: "transparent", border: "none", color: "#007bff", display: "block", padding: "10px 15px", borderRadius: "8px" }}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
