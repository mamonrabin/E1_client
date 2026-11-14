
import { Metadata } from "next";
import PageSection from "@/src/utilits/PageSection";
import AboutContent from "@/src/components/about/AboutContent";


export const metadata: Metadata = {
  title: "About Us | SOZA",
  description:
    "Discover SOZA — our story, philosophy, and passion for contemporary fashion.",
};

const AboutPage = () => {
  return (
    <main className="">
      <PageSection second="About Us" />
      <AboutContent />
    </main>
  );
};

export default AboutPage;
