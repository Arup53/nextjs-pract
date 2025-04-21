"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

const ProtectedDataClient = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const session = await getSession();

      if (!session) {
        setError("Not authenticated");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/protected-data", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch protected data");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h2>Testing Authentication</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <div>
          <p>Message: {data.message}</p>
          <p>User ID: {data.userId}</p>
          <p>User Name: {data.userName}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedDataClient;
