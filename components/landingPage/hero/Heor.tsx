import { Button } from "@/components/ui/moving-border";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Hero = () => {
  const gradientRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const gradient = gradientRef.current;

    // Create a timeline for smooth, continuous animation
    const tl = gsap.timeline({
      repeat: -1, // Loop indefinitely
      yoyo: true, // Reverse the animation to create a pulsing effect
    });

    // Animate the gradient position
    tl.to(gradient, {
      backgroundPosition: "50% 100%",
      opacity: 0.2,
      duration: 4,
      ease: "sine.inOut",
    }).to(gradient, { opacity: 1, duration: 4, ease: "sine.inOut" });

    // Cleanup function
    return () => tl.kill();
  }, []);

  const handleClick = () => {
    console.log("Hello there");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden ">
      <div
        ref={gradientRef}
        className="w-full h-full absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at bottom center, rgba(255, 173, 96, 0.7) 0%, rgba(255, 242, 228, 0.3) 30%, rgba(255, 242, 228, 0) 70%)",
          backgroundSize: "100% 200%",
          backgroundPosition: "50% 0%",
        }}
      />

      {/* Sample content overlay */}
      <div className="z-10 text-center max-w-3xl p-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Build faster with beautiful components
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Premium UI components built with React and Tailwind CSS. Save time and
          ship your next project faster with our ready-to-use components.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-black text-white px-6 py-3 rounded-md font-medium">
            Get Started
          </button>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-md font-medium">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </button>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={handleClick}
          >
            Borders are cool
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
