"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();
         console.log(data);

    // SAVE TOKEN
localStorage.setItem(
  "token",
  data.access_token
);

localStorage.setItem(
  "role",
  data.user.role
); 
 
      alert("Login success ✅");
     
      router.push("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl text-green-500 font-bold mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded bg-black text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded bg-black text-white"
          />

          <button
            onClick={login}
            className="w-full bg-green-500 text-black py-3 rounded font-bold"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}