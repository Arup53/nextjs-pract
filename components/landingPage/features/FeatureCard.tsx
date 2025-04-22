import Image from "next/image";

interface CardTypes {
  id: string;
  title: string;
  feature1: string;
  feature2: string;
  img: string;
}

const FeatureCard = ({ id, title, feature1, feature2, img }: CardTypes) => {
  return (
    <section id={id} className="bg-[#f6f4ef] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 rounded-xl">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">{title}</h2>
          <ul className="space-y-4 text-gray-800 text-lg">
            <li className="flex items-start gap-3">
              <span>{feature1}</span>
            </li>
            <li className="flex items-start gap-3">
              <span>{feature2}</span>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="flex justify-center md:justify-end ">
          <Image
            className="rounded-2xl"
            width={500}
            height={500}
            src={img}
            alt="Corporate cards UI"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
