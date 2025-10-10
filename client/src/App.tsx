import "./App.css";
import { Routes, Route } from "react-router-dom"; // Import Routes, Route
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./pages/RequireAuth";

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
            <Route path="/open-prs" element={<OpenPRs />} />
            <Route path="/closed-prs" element={<ClosedPRs />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
