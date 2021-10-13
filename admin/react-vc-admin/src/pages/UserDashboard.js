import React, { useState, useEffect } from "react";
import "App.css";
import { getAllUsers } from "data/UserRepository";

function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    loadUsers();
  }, [])

  return (
    <div>
      <div className="page-title">| User Management</div>
      
      
    </div>
  );
}

export default UserDashboard;