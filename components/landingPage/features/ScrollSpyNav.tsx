"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "corporate-cards", label: "Corporate Cards" },
  { id: "invoice-management", label: "Invoice Management" },

  { id: "reimbursements", label: "T&E Reimbursements" },
];

export default function ScrollSpyNav() {
  const [activeId, setActiveId] = useState<string>("corporate-cards");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // triggers when the section is near center
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-10 p-4">
      <ul className="space-y-4 text-gray-400">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`transition-all duration-300 ${
                activeId === id
                  ? "text-black font-semibold border-l-2 pl-2 border-black"
                  : ""
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
