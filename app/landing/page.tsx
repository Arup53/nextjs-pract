"use client";

import Features from "@/components/landingPage/features/Features";
import Footer from "@/components/landingPage/footer/Footer";
import Hero from "@/components/landingPage/hero/Heor";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
