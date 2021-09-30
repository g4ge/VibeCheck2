import React from "react";
import "App.css";
import Header from "components/Header";
import Post from "images/features/post.png"
import Reply from "images/features/reply.png"
import Edit from "images/features/edit.png"
import Profile from "images/features/profile.png"

function Landing() {
  return (
    <div>
      <Header isSignedIn={false} type={"landing"}/>
      
      {/* parallax background image */}
      <div className="parallax"></div>

      <div className="intro-wrap">
        {/* scroll down button animation */}
        <div className="intro-scroll"></div>

        {/* landing page slogan */}
        <div className="intro-title">
          For Students, By Students.
        </div>

        {/* app description */}
        <div className="row justify-content-around intro-text mb-5">
          <div className="col-lg-10">
            <b>VibeCheck</b>, a perfect spot that provides friendly network for university students to connect with each other.
            Make new friends, discuss any questions or issues about the courses, share interesting ideas & recommend useful study resources with VibeCheck.
            Start joining us today!
          </div>
        </div>

        {/* app features */}
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-2 mb-5">
              <img className="intro-icon" src={Post} alt="Post"></img>
              <div className="feature-title mb-2">
                Post
              </div>
              <div className="feature-desc">
                Ask a question or share an interesting photo with other students
              </div>
            </div>

            <div className="col-lg-2 mb-5">
              <img className="intro-icon" src={Reply} alt="Reply"></img>
              <div className="feature-title mb-2">
                Reply
              </div>
              <div className="feature-desc">
                Help other students by answering their questions or sharing your ideas
              </div>
            </div>
            
            <div className="col-lg-2 mb-5">
              <img className="intro-icon" src={Edit} alt="Edit"></img>
              <div className="feature-title mb-2">
                Edit
              </div>
              <div className="feature-desc">
                Make changes to your post or delete it to make sure information is up-to-date
              </div>
            </div>
            
            <div className="col-lg-2 mb-5">
              <img className="intro-icon" src={Profile} alt="Profile"></img>
              <div className="feature-title mb-2">
                Profile
              </div>
              <div className="feature-desc">
                Customise your own profile and get others to know you better
              </div>
            </div>

            {/* image & icon references */}
            <div className="references">
              Photo by {" "}
              <a className="link" href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on {" "}
              <a className="link" href="https://unsplash.com/s/photos/social?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> • Icons by {" "}
              <a className="link" href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market"> Vectors Market</a>, {" "}
              <a className="link" href="https://www.freepik.com" title="Freepik">Freepik</a> & {" "} 
              <a className="link" href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from {" "}
              <a className="link" href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;