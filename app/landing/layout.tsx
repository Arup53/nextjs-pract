import Navbar from "@/components/landingPage/navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <main> {children}</main>
    </div>
  );
}
