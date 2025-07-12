import Image from "next/image";
import Link from "next/link";

const Preview = () => {
  return (
    <section className="bg-white mt-6 pt-10 pb-24 overflow-x-hidden">
      <div className="container mx-auto pr-22 md:pr-0 md:px-2">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start md:space-x-[60px] gap-18">
          {[
            {
              img: "/images/Preview1.png",
              title: "Birthday\nCollection",
              subtitle: "Must See New Style",
            },
            {
              img: "/images/Preview2.jpg",
              title: "Summer\nEssentials",
              subtitle: "New Collection",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative w-full max-w-[290px] sm:max-w-[400px] md:max-w-[500px]"
            >
              {/* Image */}
              <div className="relative mx-4 h-[280px] sm:h-[360px] md:h-[504px] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              
              <div
                className={`
                  
                  absolute 
                  -bottom-15
                  right-[-70px] sm:right-[-70px] md:right-[-125px] 
                  bg-background
                  w-[70%] sm:w-[70%] md:w-[80%] 
                  max-w-[290px] sm:max-w-[320px] md:max-w-[370px]
                  h-[200px] md:h-[260px] lg:h-[350px]
                  z-10
                  transition-all duration-300
                `}
              >
                <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-14 justify-center items-center text-center py-7 md:py-14 lg:px-6">
                  <div className="">
                    <p className="text-[10px] md:text-xs font-medium uppercase tracking-wide text-primary  mb-4">
                      {item.subtitle}
                    </p>
                    <h3 className="text-base sm:text-sm md:text-3xl text-black opacity-70 font-mono ">
                      {item.title.split("\n").map((line, index) => (
                          <span key={index} className="">
                            {line}
                            {index < item.title.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                    </h3>
                  </div>
                  <Link
                    href="#"
                    className="inline-block bg-primary text-background text-xs md:text-sm px-4 md:px-8 py-2 hover:bg-primary/90 transition"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Preview;
