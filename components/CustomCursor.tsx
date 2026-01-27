
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('button, a, input, [role="button"]'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Central Aim Point */}
      <motion.div
        className="fixed w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,1)]"
        style={{ left: cursorX, top: cursorY, x: '-50%', y: '-50%' }}
      />
      
      {/* HUD Trailing Ring */}
      <motion.div
        className="fixed w-10 h-10 border border-indigo-500/30 rounded-full flex items-center justify-center"
        style={{ 
          left: trailX, 
          top: trailY, 
          x: '-50%', 
          y: '-50%',
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.3)'
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-indigo-500/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-indigo-500/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-indigo-500/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-indigo-500/50" />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
