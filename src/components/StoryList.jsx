import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./StoryList.css";

function StoryList() {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    fetch("https://mxpertztestapi.onrender.com/api/sciencefiction")
      .then(res => res.json())
      .then(data => {
        console.log("Full API Response:", data);

        if (Array.isArray(data)) {
          
          const validStories = data.filter(story => 
            story.Title && story.Image && story.Image.length > 0
          );

          console.log("Filtered Stories:", validStories);
          setStories(validStories);
          setFilteredStories(validStories);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  
  
  const filterStories = (status) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter((story) => story.Status === status);
      setFilteredStories(filtered);
    }
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < filteredStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <div>
<div className="header-container">
  <div className="navbar">
    <div className="logo">BrainyLingo</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/daily-quiz">Daily Quiz</Link>
      <Link to="/genres">Genres</Link>
    </div>
    <button className="signout-btn">Sign Out</button>
  </div>

      <h1><span> Science Fiction </span>Stories</h1>

  <div className="filter-buttons">
    {["All", "Published", "Draft", "Completed", "In Progress"].map((status) => (
      <button key={status} className={selectedStatus === status ? "active" : ""} onClick={() => filterStories(status)}>
        {status}
      </button>
    ))}
  </div>

  {/* Curved SVG */}
  <svg className="curve" viewBox="0 0 1440 320">
    <path fill="#0c0527" fillOpacity="1" d="M0,224L60,218.7C120,213,240,203,360,181.3C480,160,600,128,720,133.3C840,139,960,181,1080,213.3C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
  </svg>
  
</div>


 <div className="story-container">
        {filteredStories.length === 0 ? (
          <p>No stories available.</p>
        ) : (
          filteredStories.map((story, index) => (
            <div key={story._id || index} 
            className={`story-card ${index === currentIndex ? "highlighted" : ""}`} 
            >
                 <img
                src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                alt={story.Title}
               className="story-image"
              />
             <h2 className="story-title">{story.Title}</h2>
              <span className="story-status">{story.Status || "Unknown"}</span>

              <Link to={`/story/${story._id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>

      {filteredStories.length > 0 && (
        <div className="navigation-buttons">
          <button onClick={handlePrevious} className="prev" disabled={currentIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} className="next" disabled={currentIndex === filteredStories.length - 1}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default StoryList;



















