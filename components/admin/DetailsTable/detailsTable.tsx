"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string | null;
  totalTransactionAmount: number;
  cardStatus: boolean | string;
  cardHolderId: string; // ← Add this
  cardId: string;
  createdAt: string; // ISO date string
}

const DetailsTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:3001/allusers",
          {
            signal: controller.signal,
          }
        );
        setUsers(response.data);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching users:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort(); // Cancel the request on cleanup
    };
  }, []);

  const handleCardStatusClick = async (user: User) => {
    try {
      const payload = {
        cardHolderId: user.cardHolderId,
        cardId: user.cardId,
      };

      const response = await axios.put(
        "http://localhost:3001/admin/approve",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Approval successful:", response.data);
      // Optional: refresh users or show a success toast
    } catch (error) {
      console.error("Error during approval:", error);
      // Optional: show error toast or message
    }
  };

  console.log(users);
  return (
    <div className="flex justify-center items-center  ">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Card Status</TableHead>
            <TableHead className="text-right">Total Transaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell
                className={`cursor-pointer ${
                  user.cardStatus !== false ? "cursor-not-allowed" : ""
                }`}
                onClick={
                  user.cardStatus === false
                    ? () => handleCardStatusClick(user)
                    : undefined
                }
              >
                {user.cardStatus === true && (
                  <p className="text-lime-500 px-4 py-2 bg-lime-100 rounded-2xl text-center">
                    Active
                  </p>
                )}
                {user.cardStatus === false && (
                  <p className="text-yellow-500 px-4 py-2 bg-yellow-100 rounded-2xl text-center">
                    Required Activation
                  </p>
                )}
                {user.cardStatus === "not applied" && (
                  <p className="text-red-500 px-4 py-2 bg-red-100 rounded-2xl text-center">
                    Not Applied
                  </p>
                )}
              </TableCell>
              <TableCell className="text-right">
                {user.totalTransactionAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              <div>
                $
                {users &&
                  users.reduce(
                    (acc: number, curr: User) =>
                      acc + curr.totalTransactionAmount,
                    0
                  )}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DetailsTable;
