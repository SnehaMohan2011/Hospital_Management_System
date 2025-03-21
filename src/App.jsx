import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/frontpage";
import Bookingpage from './booking/bookingpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/booking" element={<Bookingpage />} />
      </Routes>
    </Router>
  );
}

export default App;
