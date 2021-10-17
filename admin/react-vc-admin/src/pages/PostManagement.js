import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faComments } from "@fortawesome/free-solid-svg-icons";
import { getMostPopularPost } from "data/PostRepository";
import SinglePost from "components/SinglePost";
import { Doughnut, Bar } from 'react-chartjs-2';
import "App.css";

function PostDashboard() {
  const [mostPopularPost, setMostPopularPost] = useState(null);
  const [chart, setChart] = useState({});

  const donutData = {
    labels: ['Like', 'Dislike', 'Reply'],
    datasets: [
      {
        data: [chart.totalLikeCount, chart.totalDislikeCount, chart.totalReplyCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const donutOptions = { maintainAspectRatio: false };
  
  const barData = {
    labels: ['Like', 'Dislike', 'Reply'],
    datasets: [
      {
        label: 'Count',
        data: [chart.totalLikeCount, chart.totalDislikeCount, chart.totalReplyCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const barOptions = {
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
    // get the most popular post of all the posts
    const loadData = async () => {
      const post = await getMostPopularPost();

      setMostPopularPost(post);
      setChart({
        totalLikeCount: post.totalLikeCount, 
        totalDislikeCount: post.totalDislikeCount,
        totalReplyCount: post.totalReplyCount
      })
    }  
    loadData();
  }, []);

  return (
    <div>
      <div className="row">
        {/* post management page title */}
        <div className="col-6">
          <div className="page-title">
            <Link className="dashboard-link" to={"/"}>
              <div className="icon-btn back-btn">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
              </div>
            </Link>
            {" "}| Post Management
          </div>  
        </div>
        {/* view all posts link */}
        <div className="col-6">
          <div className="page-title-right">
            <Link className="dashboard-link" to={"/post/all"}>
              <div className="custom-btn view-posts-btn">
                <FontAwesomeIcon icon={faComments} size="xs" fixedWidth /> View All Posts
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* most popular post with its replies */}
      <div className="page-subtitle">Most popular post of all the posts made on the VC website</div>
      {mostPopularPost !== null &&
        <div className="po-wrap mt-4">
          <SinglePost post={mostPopularPost} enableDelete={false} />
        </div>
      }

      {/* donut and bar graph for number of likes, dislikes and replies of the most popular post */}
      <div className="page-subtitle mt-5">Most popular post statistics</div>
      <div className="row">
        <div className="col-md-6">
          <div className="flw-donut-bar-wrap mt-3"> 
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="flw-donut-bar-wrap mt-3"> 
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDashboard;