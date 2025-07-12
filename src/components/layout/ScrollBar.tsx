const ScrollBar = ({ texts, speed = 5000 }: { texts: string[], speed: number }) => {
  return (
    <div className="relative w-full h-10 overflow-hidden bg-[#0A142F] text-nowrap">
      <div className="absolute flex top-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="flex animate-infinite-scroll"
            style={{ "--scroll-speed": `${speed}ms` } as React.CSSProperties}
          >
            {texts.map((text, id) => (
              <div className="flex items-center" key={id}>
                <p className="px-1 text-[15px] text-white text-nowrap">{text}</p>
                {id !== texts.length - 1 && (
                  <span className="text-white text-[15px]">.</span>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ScrollBar;
