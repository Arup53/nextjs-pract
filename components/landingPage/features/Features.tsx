import FeatureCard from "./FeatureCard";
import ScrollSpyNav from "./ScrollSpyNav";

const Features = () => {
  return (
    <div className="bg-stone-100 py-12">
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

          <FeatureCard
            id="invoice-management"
            title="Invoice Management"
            feature1="Improve your vendor relationships and reduce duplicate payments by maintaining a centralized place for all your bills, approvals, and payments."
            feature2="Make local or international payments via one-click wire transfer to 140+ currencies or by using Pluto corporate cards."
            img="/card-2.jpg"
          />
          <FeatureCard
            id="reimbursements"
            title="T&E Reimbursements"
            feature1="Allow your employees to submit reimbursement requests with ease."
            feature2="Get the right approvals in place with custom approval workflows."
            img="/card-3.jpg"
          />
        </main>
      </div>
    </div>
  );
};
// Improve your vendor relationships and reduce duplicate payments by maintaining a centralized place for all your bills, approvals, and payments.
// Make local or international payments via one-click wire transfer to 140+ currencies or by using Pluto corporate cards.
// Allow your employees to submit reimbursement requests with ease.
// Get the right approvals in place with custom approval workflows.
export default Features;
