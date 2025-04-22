import FeatureCard from "./FeatureCard";
import ScrollSpyNav from "./ScrollSpyNav";
import Section from "./Section";

const Features = () => {
  return (
    <div className=" my-24 bg-stone-100 py-12  ">
      <div className="max-w-xl mx-auto text-center px-4 py-10">
        <p className="text-2xl font-medium text-black break-words">
          Whether you start with one module or adopt the whole platform, Pluto
          helps your business save time & money
        </p>
      </div>
      <div className="flex w-[80%] mx-auto">
        <aside className="w-1/4">
          <ScrollSpyNav />
        </aside>
        <main className="w-3/4">
          <FeatureCard
            id={"corporate-cards"}
            title={"Corporate Cards"}
            feature1={`Get smart, virtual, and physical corporate cards for your entire
                team with automated budget controls, receipt policy
                enforcements, and compliance management.`}
            feature2="Skip sharing OTPs"
            img="/card-1.jpg"
          />
          <Section id="invoice-management" title="Invoice Management" />
          <Section id="petty-cash" title="Petty Cash Management" />
          <Section id="reimbursements" title="T&E Reimbursements" />
          <Section id="procure-to-pay" title="Procure to Pay" />
          <Section id="insights" title="Real time insights" />
        </main>
      </div>
    </div>
  );
};

export default Features;
