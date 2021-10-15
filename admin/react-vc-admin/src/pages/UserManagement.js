import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getNumUsersPerDay } from "data/UserRepository";
import { Line } from 'react-chartjs-2';
import "App.css";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [chart, setChart] = useState({});

  const data = {
    labels: chart.labels,
    datasets: [
      {
        label: 'Number of users',
        data: chart.data,
        fill: false,
        backgroundColor: 'rgb(30, 144, 255)',
        borderColor: 'rgba(30, 144, 255, 0.3)',
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const loadData = async () => {  
      // get all users
      const allUsers = await getAllUsers();
      setUsers(allUsers);    

      // get num of users per day for the last 7 days for plotting line graph
      const numUsersPerDay = await getNumUsersPerDay();
      setChart({ labels: numUsersPerDay.dates, data: numUsersPerDay.num_users });
    }
    loadData();
  }, [])

  return (
    <div>
      <div className="page-title">| User Management</div>
      
      {/* num of users per day for the last 7 days line graph */}
      <div className="page-subtitle">Number of users using VC per day for the last 7 days</div>
      <div className="num-user-line-wrap mt-2 mb-5">
        <Line data={data} options={options} />
      </div>

      <div className="page-subtitle">Select and manage user</div>
      {/* list of all users */}
      {users.length > 0 &&
        <div className="row">
          {users.map(user =>
            <div key={user.id} className="col-lg-3 mt-3">
              <Link className="dashboard-link" to={{ pathname: `/user/${user.id}` }}>
                <div className="custom-btn user-tab">
                  <div className="user-tab-username">{user.username}</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default UserDashboard;