"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const ApplyCardForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formData = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage("Application submitted successfully!");
      console.log("Server response:", data);
    } catch (error) {
      console.error("Submission failed:", error);
      setMessage("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Apply for Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            disabled
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ApplyCardForm;
