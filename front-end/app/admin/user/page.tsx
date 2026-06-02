"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-green-500 mb-8">
        Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-900 p-4 rounded-xl"
          >
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}