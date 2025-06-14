import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-[60vh]">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/dashboard/admin"}
      >
        Admin Demo
      </Link>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/dashboard/user"}
      >
        User Demo
      </Link>
    </div>
  );
};

export default Page;
