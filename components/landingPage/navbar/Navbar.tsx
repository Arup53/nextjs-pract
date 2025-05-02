import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        {/* <div className=" flex justify-between items-center">
          <Link href={"/login"}>login</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div> */}
      </div>
      <nav className="w-full flex justify-between items-center py-4 px-6 md:px-12 bg-black">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
            >
              <path
                d="M16 5L19 11L26 12L21 17L22 24L16 21L10 24L11 17L6 12L13 11L16 5Z"
                fill="white"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">pluto</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-md text-sm"
          >
            <Link href={"/auth/login"}>Login</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-md text-sm"
          >
            <Link href={"/upload"}>Upload</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 rounded-md text-sm"
          >
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
          <Button className="bg-emerald-400 hover:bg-emerald-500 text-black font-medium rounded-md text-sm">
            Sign Up for Free
          </Button>
        </div>

        <button className="lg:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
