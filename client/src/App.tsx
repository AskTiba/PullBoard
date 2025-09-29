import "./App.css";
import { Routes, Route } from "react-router-dom"; // Import Routes, Route
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import DashBoard from "./pages/DashBoard";
import ScrollToTop from "./ScrollToTop"; // Import ScrollToTop
import Navbar from "./components/layout/Navbar";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Navbar />
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
