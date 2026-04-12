// pages/index.js
import Image from "next/image";
import Homee from "@/Homesections/Homee";
import HomeSection1 from "@/Homesections/Homesection1";
import HomeSection2 from "@/Homesections/Homesection2";
import HomeSection3 from "@/Homesections/Homesection3";
import HomeSection4 from "@/Homesections/Homesection4";
import HomeSection5 from "@/Homesections/Homesection5";
import HomeSection6 from "@/Homesections/Homesection6";
import Homesection1_1 from "@/Homesections/Homesection1_1";
// import Homesection0_1 from "@/Homesections/Homesection0_1";
import Homesection7 from "@/Homesections/Homesection7";
import Skills from "../Homesections/skills"
import HomesectionPGP from "@/Homesections/HomesectionPGP";
import HomesectionPG from "@/Homesections/HomesectionPG";
import PopularDiplomaCourses from "@/Homesections/PopularDiplomaCourses";

export default function Home() {
  return (
        <div className="mx-auto max-h-7xl">
      <Homee />
      <Homesection1_1/>
      <HomeSection1 />
      <HomesectionPGP />
      <HomesectionPG />
      <PopularDiplomaCourses />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      {/* <HomeSection6 /> */}
      <Skills/>
      <HomeSection5 />
      <Homesection7/>
    </div>
  );
}