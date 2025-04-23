import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MoodTracker from "./pages/CreateNote";
import MoodCards from "./pages/AllNotes"

const App = () => {
  return (
    <Router>
      <Header />
      <div className="p-4 bg-orange-300">
        <Routes>
          <Route path="/showall" element={<MoodCards />} />
          <Route path="/create" element={<MoodTracker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
