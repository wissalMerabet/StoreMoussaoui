"use client";

interface GoldPriceItem {
  label: string;
  minPrice: number;
  maxPrice: number;
}

const goldPrices: GoldPriceItem[] = [
  { label: "LOCAL - FETLA 18K", minPrice: 22500, maxPrice: 22900 },
  { label: "SUPER MASSIF 18K", minPrice: 22800, maxPrice: 23500 },
  { label: "SUPER MASSIF 18K", minPrice: 22800, maxPrice: 23500 },
  { label: "IMPORTATION", minPrice: 23500, maxPrice: 24000 },
  { label: "IMPORTATION CHIC", minPrice: 24500, maxPrice: 24800 },
  { label: "EXTRA CHIC", minPrice: 24800, maxPrice: 25500 },
];

const GoldPriceGrid = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto ">
        <h2 className="sub-heading px-4 pb-6">Prix De L&apos;or Aujourd&apos;hui</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-8 md:p-4 ">
          {goldPrices.map(({ label, minPrice, maxPrice }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 shadow-sm hover:shadow-md bg-white"
            >
              <span className="text-sm md:text-[20px] opacity-90 leading-[24px] uppercase">
                {label}
              </span>
              <span className="text-xl md:text-2xl lg:text-[28px] text-primary font-bold mt-4">
                {minPrice.toLocaleString("fr-FR")} -{" "}
                {maxPrice.toLocaleString("fr-FR")} DA
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GoldPriceGrid;
