// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import KeyFeatures from "./components/layout/KeyFeatures";
import AppReview from "./components/layout/AppReview";
import WhyChoose from "./components/layout/WhyChoose";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <KeyFeatures />
      <AppReview />
      <WhyChoose />
      <Footer />
    </>
  );
}

export default App;
