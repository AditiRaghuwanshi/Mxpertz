import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./StoryDetails.css";  

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then((response) => response.json())
      .then((data) => setStory(data))
      .catch((error) => console.error("Error fetching story details:", error));
  }, [id]);

  if (!story) return <p className="loading">Loading...</p>;

  return (
  
<>
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




      

      <div className="story-container">
      <h1 className="story-title">{story.Title}</h1>

      
      <img className="story-main-image" 
        src={`https://ik.imagekit.io/dev24/${story.Image[0]}`} 
        alt={story.Title} 
      />
<div className="tab-wrapper">
  <div className="tab-buttons">
    <button className={activeTab === "overview" ? "active-tab" : ""} onClick={() => setActiveTab("overview")}>
      Overview
    </button>
    <button className={activeTab === "content" ? "active-tab" : ""} onClick={() => setActiveTab("content")}>
      Story Content
    </button>
    <button className={activeTab === "wordexplore" ? "active-tab" : ""} onClick={() => setActiveTab("wordexplore")}>
      Word Explorer
    </button>
  </div>
</div>


    
      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <p>
              <strong> Status: </strong>
             {story.Status}</p>
          </div>
        )}

        {activeTab === "content" && (
          <div className="content-section">
            {story.Storyadvenure?.content?.map((section) => (
              <div key={section._id} className="story-section">
                {section.Storyimage.map((img, index) => (
                  <img key={index} className="story-image" 
                    src={`https://ik.imagekit.io/dev24/${img}`} 
                    alt="Story Scene" 
                  />
                ))}
                {section.Paragraph.map((para, index) => (
                  <p key={index} className="story-text">{para}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "wordexplore" && (
          <div className="word-explore-section">
            {story.Wordexplore?.map((word) => (
              <div key={word._id} className="word-box">
                <h3 className="word-title">{word.Storytitle}</h3>
                <p className="word-text">{word.Storyttext}</p>
                <p><strong>Synonyms:</strong> {word.Synonyms}</p>
                <p><strong>Antonyms:</strong> {word.Antonyms}</p>
                <img className="word-image" 
                  src={`https://ik.imagekit.io/dev24/${word.Storyimage[0]}`} 
                  alt={word.Storytitle} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default StoryDetails;

