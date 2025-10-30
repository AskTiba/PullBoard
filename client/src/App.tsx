import "./App.css";
import { Routes, Route } from "react-router-dom"; // Import Routes, Route
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./pages/RequireAuth";
import PullRequests from "./pages/PullRequests";
import DependencyTimeMachine from "./pages/DependencyTimeMachine";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="/pull-requests/:owner/:repo" element={<PullRequests />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/dependency-time-machine" element={<DependencyTimeMachine />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
