

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StoryList from "./components/StoryList";
import StoryDetails from "./components/StoryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/story/:id" element={<StoryDetails />} />
      
      </Routes>
    </Router>
  );
}

export default App;
