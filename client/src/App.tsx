// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom"; // Import Routes, Route
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import DashBoard from "./pages/DashBoard";
import ScrollToTop from './ScrollToTop'; // Import ScrollToTop

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/open-prs" element={<OpenPRs />} />
        <Route path="/closed-prs" element={<ClosedPRs />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
