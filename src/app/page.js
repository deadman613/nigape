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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "National Institute of Generative Ai + Prompt Engineering",
  "image": "https://nigape.com/Nigapepic/nigape.svg",
  "@id": "",
  "url": "https://nigape.com/",
  "telephone": "+91 74281 14918",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2 Floor, Design House Spacetime, Greater Kailash-1, Block S, Greater Kailash I, Greater Kailash, New Delhi, Delhi 110048",
    "addressLocality": "south delhi",
    "postalCode": "110048",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.54821,
    "longitude": 77.23797
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/nigape.official/",
    "https://in.linkedin.com/in/national-institute-genai-and-prompt-engineering-116711381"
  ]
};

export default function Home() {
  return (
        <div className="mx-auto max-h-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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