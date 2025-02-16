"use client";

import Header from "./header";
import MyMarquee from "./marquee";
import MiddleSection from "./MiddleSection";
import Footer from "./footer";
import FaqComponent from "./FaqComponent";
import ContactLinks from "./contact-links";
import { useRef } from "react";
import HeroSection from "./HeroSection";

type SectionType = "section1" | "section3" | "section4";

const ThreeSectionPage: React.FC = () => {
  const section1Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);

  const handleScrollTo = (section: SectionType) => {
    let ref = null;
    if (section === "section1") ref = section1Ref;
    if (section === "section3") ref = section3Ref;
    if (section === "section4") ref = section4Ref;

    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[#100c08]">
      {/* Hero Section */}
      <section ref={section1Ref}>
        <Header onNavClick={handleScrollTo} />
        <HeroSection/>
      </section>

      {/* Section 2 */}
      <section className="h-[150vh] text-white bg-[#100c08] relative overflow-hidden group">
        <MyMarquee />
        <MiddleSection />
      </section>

      {/* Section 3 */}
      <section
        className="relative h-screen flex items-center justify-center text-white bg-[#100c08] px-20"
        ref={section3Ref}
      >
        <FaqComponent />
      </section>

      {/* Contact Section */}
      <section ref={section4Ref}>
        <div className="px-20 py-6">
          <h1 className="text-5xl font-bold text-slate-300 mb-6">Contact</h1>
          <ContactLinks />
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative h-[206px] flex items-center justify-center">
        <Footer />
      </section>
    </main>
  );
};

export default ThreeSectionPage;
