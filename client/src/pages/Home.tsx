import React from 'react';
import KeyFeatures from '../components/layout/KeyFeatures';
import AppReview from '../components/layout/AppReview';
import WhyChoose from '../components/layout/WhyChoose';

const Home: React.FC = () => {
  return (
    <>
      <KeyFeatures />
      <AppReview />
      <WhyChoose />
    </>
  );
};

export default Home;
