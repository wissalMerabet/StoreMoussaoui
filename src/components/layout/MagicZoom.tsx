'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface MagicZoomProps {
  src: string;
  alt?: string;
  scale?: number;
  className?: string;
}

export default function MagicZoom({
  src,
  alt = '',
  scale = 3,
  className = '',
}: MagicZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState('center');

  const updatePosition = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setBackgroundPos(`${xPercent}% ${yPercent}%`);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isZoomed) updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isZoomed && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isZoomed]);

  const handleEnter = () => setIsZoomed(true);
  const handleLeave = () => {
    setIsZoomed(false);
    setBackgroundPos('center');
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      className={`relative overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} ${className}`}
      style={{ touchAction: 'none' }}
    >
      <div
        className="w-full h-full bg-no-repeat bg-center transition-all duration-100 ease-out"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: isZoomed ? `${scale * 100}%` : '100%',
          backgroundPosition: backgroundPos,
        }}
      >
        <div className="relative w-full aspect-square">
          <Image
            src={src}
            alt={alt}
            fill
            className="opacity-0 pointer-events-none object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
