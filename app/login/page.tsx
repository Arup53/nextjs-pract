"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <button
        onClick={() => {
          signIn();
        }}
      >
        SignIn
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
      {JSON.stringify(session)}

      <Link
        className="my-12 text-yellow-400"
        href={"/makeAnAuthenticatedRequest"}
      >
        Test authentication
      </Link>
    </div>
  );
};

export default Login;
