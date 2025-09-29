import React from "react";
import KeyFeatures from "../components/layout/KeyFeatures";
import AppReview from "../components/layout/AppReview";
import WhyChoose from "../components/layout/WhyChoose";
import Hero from "../components/layout/Hero";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <KeyFeatures />
      <AppReview />
      <WhyChoose />
    </>
  );
};

export default Home;
