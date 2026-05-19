"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link href="/admin/products" className="bg-gray-900 p-6 rounded-xl">
          📦 Products
        </Link>

        <Link href="/admin/orders" className="bg-gray-900 p-6 rounded-xl">
          🧾 Orders
        </Link>

        <Link href="/admin/users" className="bg-gray-900 p-6 rounded-xl">
          👤 Users
        </Link>

      </div>

    </div>
  );
}