import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { useParams, Link } from "react-router-dom";
import { getTimeSpentPerDay, getOneUser } from "data/UserRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function UserTime() {
  const { id } = useParams();
  const [chart, setChart] = useState({});
  const [user, setUser] = useState({});

  const data = {
    labels: chart.labels,
    datasets: [
      {
        label: 'Time spent in minutes',
        data: chart.data,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
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
      // get the user data
      const user = await getOneUser(parseInt(id));
      setUser(user); 

      // get user time spent per day for the last 7 days
      const timeSpentPerDay = await getTimeSpentPerDay(parseInt(id));
      setChart({ labels: timeSpentPerDay.dates, data: timeSpentPerDay.times_spent });
    }
    loadData();
  }, [id])

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <div className="page-title">
            <Link className="dashboard-link" to={`/user/${id}`}>
              <div className="icon-btn back-btn">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
              </div>
            </Link>
            {" "}| Time Spent
          </div>
        </div>
        <div className="col-9">
          <div className="page-title-right">Current viewing user: <strong><i>{user.username}</i></strong></div>
        </div>
      </div>
      <div className="page-subtitle">Time spent on VC per day for the last 7 days</div>
      
      {/* time spent per day for the last 7 days bar graph */}
      <div className="time-spent-bar-wrap mt-4">
        <Bar data={data} options={options} />
      </div>
    
    </div>
  );
}

export default UserTime;