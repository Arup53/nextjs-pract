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
    <div className=" relative flex items-center justify-center w-full h-[100vh] overflow-hidden ">
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
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
