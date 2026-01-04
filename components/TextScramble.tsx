
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number; // Added to control overall speed
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  duration = 2.5 // Default duration in seconds
}) => {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>(null);

  const scramble = useCallback(() => {
    if (hasAnimated) return;
    
    let frame = 0;
    const totalFrames = Math.floor(duration * 60);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

    // Setup queue with staggered start/end times
    for (let i = 0; i < text.length; i++) {
      const from = CHARS[Math.floor(Math.random() * CHARS.length)];
      const to = text[i];
      // Create a more intentional stagger from left to right
      const start = Math.floor((i / text.length) * (totalFrames * 0.4));
      const end = start + Math.floor(Math.random() * (totalFrames * 0.6)) + (totalFrames * 0.2);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0, n = queue.length; i < n; i++) {
        let { to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          // Slow down character swapping by only changing it every few frames
          if (!char || frame % 4 === 0) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span class="opacity-40 text-indigo-400 font-mono">${char}</span>`;
        } else {
          output += '<span class="opacity-0">.</span>';
        }
      }

      setDisplayText(output);

      if (complete !== queue.length) {
        frame++;
        animationRef.current = requestAnimationFrame(update);
      } else {
        setHasAnimated(true);
      }
    };

    setTimeout(() => {
      update();
    }, delay);
  }, [text, hasAnimated, delay, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          scramble();
          observer.disconnect(); // Ensure it only triggers once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [scramble, hasAnimated]);

  return (
    <span 
      ref={elementRef}
      className={className} 
      dangerouslySetInnerHTML={{ __html: displayText || (hasAnimated ? text : '') }} 
    />
  );
};

export default TextScramble;
