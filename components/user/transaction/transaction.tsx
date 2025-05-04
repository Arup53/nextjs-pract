"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Transaction = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number | "">("");
  const [payto, setpayto] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [cardDetails, setCardDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelRequest = false;

    const fetchCardDetails = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await axios.get(
          "http://localhost:3001/users/cardDetails",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!cancelRequest) {
          setCardDetails(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelRequest) {
          console.error("Error fetching card details:", err);
          setError("Failed to load card details.");
          setLoading(false);
        }
      }
    };

    fetchCardDetails();

    return () => {
      cancelRequest = true; // 🧹 cancel state update on unmount
    };
  }, [session?.accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !session?.accessToken || !cardDetails?.cardDetails?.card_id)
      return;
    console.log(payto);
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3001/transaction",
        {
          amount,
          cardId: cardDetails.cardDetails.card_id,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      setMessage("Transaction submitted successfully!");
      setAmount("");
    } catch (err) {
      console.error("Transaction error:", err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  console.log(cardDetails?.cardDetails?.card_id);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Submit Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="payto"
            className="block text-sm font-medium text-gray-700"
          >
            Pay To
          </label>
          <input
            type="text"
            id="payto"
            name="payto"
            value={payto}
            onChange={(e) => setpayto(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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

export default Transaction;
