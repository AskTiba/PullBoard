// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from 'react-router-dom'; // Import Routes, Route
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from './pages/Home'; // Import Home component
import OpenPRs from './pages/OpenPRs'; // Import OpenPRs component
import ClosedPRs from './pages/ClosedPRs'; // Import ClosedPRs component

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/open-prs" element={<OpenPRs />} />
        <Route path="/closed-prs" element={<ClosedPRs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
