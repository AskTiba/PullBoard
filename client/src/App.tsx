import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import OpenPRs from "./components/pages/OpenPRs";
import ClosedPRs from "./components/pages/ClosedPRs";
import "./App.css";
// using react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";


function App() {
   const router = createBrowserRouter(
     [
      {
        path: "/",
        element: <><Navbar /><Header /></>
      },
      {
        path: "/home",
        element: <><Navbar /><Home/></>
      },
      {
        path: "/open-prs",
        element: <><Navbar /><OpenPRs/></>
      },
      {
        path: "/closed-prs",
        element: <><Navbar /><ClosedPRs/></>
      },
    ]
  )
  return (
    <>
      <div>
        <RouterProvider router={router}/>
        
      </div>
    </>
  );
}

export default App;
