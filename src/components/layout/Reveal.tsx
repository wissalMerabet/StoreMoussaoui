'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const Reveal = ({ children, delay = 0.25, duration = 0.6 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <div ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{
          duration,
          delay,
          ease: 'easeOut',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
