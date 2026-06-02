"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  userId: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/orders/123"
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  };

  fetchOrders();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-green-500 mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
       {Array.isArray(orders) &&
  orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 p-6 rounded-xl"
          >
            <h2 className="font-bold mb-4">
              Order ID: {order._id}
            </h2>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-700 py-2"
              >
                <span>{item.name}</span>

                <span>
                  {item.quantity} × ${item.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}