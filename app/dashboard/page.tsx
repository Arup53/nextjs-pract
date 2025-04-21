import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/dashboard/admin"}
      >
        Admin Demo
      </Link>
    </div>
  );
};

export default Page;
