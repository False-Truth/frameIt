import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('[data-animate]') || [];
    
    elements.forEach((element) => {
      const animation = element.dataset.animate;
      const delay = element.dataset.delay || 0;
      
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      switch (animation) {
        case 'fade-up':
          tl.from(element, {
            y: 60,
            opacity: 0,
            duration: 1,
            delay: delay
          });
          break;
        case 'fade-left':
          tl.from(element, {
            x: -60,
            opacity: 0,
            duration: 1,
            delay: delay
          });
          break;
        case 'fade-right':
          tl.from(element, {
            x: 60,
            opacity: 0,
            duration: 1,
            delay: delay
          });
          break;
        case 'scale':
          tl.from(element, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: delay
          });
          break;
        case 'slide-left':
          tl.from(element, {
            x: 100,
            opacity: 0,
            duration: 1,
            delay: delay
          });
          break;
        case 'slide-right':
          tl.from(element, {
            x: -100,
            opacity: 0,
            duration: 1,
            delay: delay
          });
          break;
        default:
          tl.from(element, {
            opacity: 0,
            duration: 1,
            delay: delay
          });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return containerRef;
};
