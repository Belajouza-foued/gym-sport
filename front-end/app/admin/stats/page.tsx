"use client";

import { useEffect, useState } from "react";

type Stats = {
  products: number;
  users: number;
  orders: number;
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    users: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading stats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-green-500 mb-8">
        Dashboard Stats
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-gray-400 mb-2">
            Products
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {stats.products}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-gray-400 mb-2">
            Users
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {stats.users}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-gray-400 mb-2">
            Orders
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {stats.orders}
          </p>
        </div>
      </div>
    </div>
  );
}