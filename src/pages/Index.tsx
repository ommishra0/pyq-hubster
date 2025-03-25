
import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrendingPYQs from "@/components/home/TrendingPYQs";
import SubjectsSection from "@/components/home/SubjectsSection";
import MockTestSection from "@/components/home/MockTestSection";
import LeaderboardSection from "@/components/home/LeaderboardSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrendingPYQs />
        <SubjectsSection />
        <MockTestSection />
        <LeaderboardSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
