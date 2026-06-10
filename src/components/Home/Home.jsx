import React from "react";
import HeroSection from "../../SubComponents/HeroSection";
import TopVillas from "../../SubComponents/TopVillas";
import Regions from "../../SubComponents/Regions";
import OurSpecialities from "../../SubComponents/OurSpecialities";
import Host from "../../SubComponents/Host";
import About from "../../SubComponents/About";
import Contact from "../../SubComponents/Contact";

import MetamaskButton from "../metamask/MetamaskButton";
import Notes from "../Notes/Notes";

const Home = () => {
  return (
    <>
      <article className="page">
        <Notes></Notes>
        <MetamaskButton />
        <HeroSection/>
        <TopVillas/>
        <Regions/>
        <OurSpecialities/>
        <Host/>
        <About/>
        <Contact/>
      </article>
    </>
  );
};

export default Home;