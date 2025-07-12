"use client";
import { TbChecks } from "react-icons/tb";
import { RiHomeLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";

const FinalStepConfirmation = () => {
  return (
    <div className="  ">
      <div className="container mx-auto  mt-36 flex flex-col items-center justify-center gap-8">
        <div className="bg-white shadow-md h-[300px] w-[269px] md:w-[620px]  md:h-[310px] flex flex-col items-center justify-center py-6 px-9 md:px-6">
          <TbChecks className="text-[#26B34E] text-7xl" />
          <p className="mb-6 text-primary text-lg font-medium md:text-2xl">
            Votre réservation a été confirmée avec succès !
          </p>
          <p className="text-sm md:text-lg">Merci d'avoir réservé avec nous.</p>
        </div>

        <button
          className="group border border-primary px-5 py-2.5 rounded-lg text-primary mb-24 hover:bg-primary hover:text-white flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          onClick={() => (window.location.href = "/")}
        >
          <MdKeyboardArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-white"
          />
          A'accueil
          <RiHomeLine
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default FinalStepConfirmation;
