"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    try {
     const res = await fetch(
  "http://localhost:3001/api/admin/orders"
);

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-white text-center mt-20">
        No orders found 📦
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-green-500 mb-8">
        My Orders
      </h1>
        <h2>orders 2</h2>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 rounded-xl p-6"
          >

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">
                  Order ID
                </p>
                <p>{order._id}</p>
              </div>

              <div>
                <span className="px-3 py-1 rounded bg-green-500 text-black font-bold text-sm">
                  {order.status}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-3 border-t border-gray-800 pt-4">

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>

                  <span className="text-green-400">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}

            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-800 pt-4 mt-4 flex justify-between">

              <span className="text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              <span className="font-bold text-xl">
                ${order.totalPrice}
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}