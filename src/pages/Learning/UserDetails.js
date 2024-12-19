import React, {useState, useEffect} from 'react';
import onlineCourse from "../../assets/user.png";

export default function UserDetails() {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        setUserData(storedUser);
      }, []);
  return (
    <div className='user-details-container' style={{display: "flex", justifyContent: "space-between"}}>
        <div>
            <div style={{fontWeight: "bold", marginBottom: "5px", marginTop: "5px"}}>{userData.username}</div>
            <div style={{fontSize: "12px"}}>{userData.username === "Admin" ? "Admin" : "Student"}</div>
        </div>
        <img src={onlineCourse} alt={"user"} style={{ width: "20%", maxHeight: "40px",objectFit: "contain"}} />
    </div>
  )
}
