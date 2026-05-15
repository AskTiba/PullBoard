import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import AuthSuccess from "./pages/AuthSuccess";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/open-prs" element={<OpenPRs />} />
        <Route path="/closed-prs" element={<ClosedPRs />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
