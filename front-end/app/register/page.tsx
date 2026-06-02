"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    try {

      const res = await fetch(
        "http://localhost:3001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      alert("Account created ✅");

      router.push("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl text-green-500 font-bold mb-6">
          Register
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded bg-black text-white"
          />

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
            onClick={register}
            className="w-full bg-green-500 text-black py-3 rounded font-bold"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}