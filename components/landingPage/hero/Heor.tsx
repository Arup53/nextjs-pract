import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="radial-yellow-bg to-white min-h-screen p-8">
      <div className="flex flex-col items-center text-center px-4 md:px-12 max-w-6xl mx-auto mt-8 md:mt-16 ">
        <h2 className="text-emerald-400 text-xl  font-semibold mb-4">
          Stop the chaos!
        </h2>
        <h1 className="text-4xl md:text-4xl  font-bold text-black mb-6 leading-tight ">
          Best Cashback Corporate Card and Expense Management Platform
        </h1>

        <div className="text-gray-400 text-base md:text-xl mb-8 max-w-3xl">
          <p className="mb-2">
            Up to 2% Unlimited Cashback • Free* International Payments to 150+
            countries
          </p>
          <p>
            • Save 100+ Hours Every Month with a Unified Expense & AP Management
            Platform
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button className="bg-black border border-gray-700 hover:bg-gray-900 text-white px-8 py-6 text-lg ">
            Book a Demo
          </Button>
          <Button className="bg-emerald-400 hover:bg-emerald-500 text-black px-8 py-6 text-lg  font-medium">
            Sign Up for Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
