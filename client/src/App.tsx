import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PullRequests from "./pages/PullRequests";
import DashBoard from "./pages/DashBoard";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Auth from "./pages/Auth";
import AuthSuccess from "./pages/AuthSuccess";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";
import ClosedPRs from "./pages/ClosedPRs";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { RepositoryProvider } from "./context/RepositoryContext";

function App() {
  return (
    <RepositoryProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
            {/* DUAL-ROUTE SUPPORT: /prs and /board both point to the PR Board */}
            <Route path="/prs" element={<PullRequests />} />
            <Route path="/board" element={<PullRequests />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
          </Route>
        </Route>
      </Routes>
    </RepositoryProvider>
  );
}

export default App;
