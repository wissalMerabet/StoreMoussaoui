'use client'

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Props {
  items: { title: string; content: string }[];
}

const Accordion = ({ items }: Props) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 font-[var(--font-sans)]">
      {items.map((item, index) => (
        <div key={index} className={`mb-4`}>
          <button
            className={`w-full border-b border-foreground group text-left rounded-lg py-4 px-6 flex justify-between items-center focus:outline-none transition-all duration-450 ${activeIndices.includes(index) ? 'bg-white   rounded-b-none border-none' : 'bg-white'}`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-sm md:text-[15px] font-medium  leading-[150%] font-sans">{item.title}</span>
            <span className="transform transition-transform ">
              {activeIndices.includes(index) ? <FiMinus size={20}/> : <FiPlus size={20}/>}              
            </span> 
          </button>
          <div
            className={`transition-all shadow-sm duration-300 overflow-hidden bg-white   ${
              activeIndices.includes(index) ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <div className="p-4">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
