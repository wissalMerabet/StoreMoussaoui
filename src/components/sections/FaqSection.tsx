import Image from "next/image";

import Accordion from "../layout/Accordion";
import { accordionItems } from "@/constants/data";
import Questions from "../layout/Questions";

const FaqSection = () => {
  return (
    <section className="bg-white py-6">
      <div className="container mx-auto px-10 max-w-7xl">
        <h2 className="sub-heading-red-center ">
          Questions fréquemment posées
        </h2>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
          {/* Accordion Section */}
          <div className="w-full md:max-w-[500px] px-2">
            <Accordion items={accordionItems} />
          </div>

          {/* Image + Questions Form Section */}
          <div className=" flex flex-col items-center justify-center text-center gap-4 px-4 text-foreground">
            <div className="w-[130px] sm:w-[150px] md:w-[220px]">
              <Image
                src="/images/Faq.png"
                alt="Frequently Asked Questions"
                width={220}
                height={220}
                className="w-full h-auto object-cover"
              />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold">Des questions ?</h3>
            <p className="text-xs md:text-[14px] font-medium max-w-lg ">
              Vous pouvez demander tout ce que vous voulez savoir Commentaires
            </p>

            <div className="w-full md:max-w-[500px] px-2 ">
              <Questions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
