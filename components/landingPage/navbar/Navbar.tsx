import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" flex justify-between items-center">
        <Link href={"/login"}>login</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
