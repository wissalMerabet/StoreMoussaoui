import FaqSection from "@/components/sections/FaqSection";
import GoldPriceGrid from "@/components/sections/GoldPriceGrid";
import Hero from "@/components/sections/Hero";
import Newproduct from "@/components/sections/Newproduct";
import Preview from "@/components/sections/Preview";
import ProductSection from "@/components/sections/ProductSection";
import Video from "@/components/sections/Video";

export default function Home() {
  return (
    <div className="relative">
      <Hero/>
      <GoldPriceGrid />
      <ProductSection />
      <Preview />
      <Video />
      <Newproduct />
      <FaqSection />

      
    </div>
  );
}
