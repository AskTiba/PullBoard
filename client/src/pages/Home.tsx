import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/layout/Hero";
import Showcase from "../components/layout/Showcase";
import HomeSections from "../components/layout/HomeSections";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Hero />
      <Showcase />
      <HomeSections />
    </>
  );
};

export default Home;
