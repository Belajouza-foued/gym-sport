"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Cart = {
  userId: string;
  items: CartItem[];
  totalPrice: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = "123"; // temporaire

  // 🔥 load cart
  const fetchCart = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/cart/${userId}`
      );

      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ remove item
  const removeItem = async (productId: string) => {
    await fetch(
      `http://localhost:3001/api/cart/${userId}/${productId}`,
      {
        method: "DELETE",
      }
    );

    fetchCart();
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading cart...
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-white text-center mt-20">
        Cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold text-green-500 mb-8">
        My Cart
      </h1>

      <div className="space-y-4">

        {cart.items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-400 text-sm">
                Qty: {item.quantity}
              </p>

              <p className="text-green-500">
                ${item.price}
              </p>
            </div>

            <button
              onClick={() =>
                removeItem(item.productId)
              }
              className="bg-red-500 px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}

      </div>

      {/* TOTAL */}
      <div className="mt-8 border-t border-gray-800 pt-6">

        <h2 className="text-2xl font-bold">
          Total: ${cart.totalPrice}
        </h2>
      </div>
<Link
  href="/checkout"
  className="mt-4 bg-green-500 text-white px-10 py-3 rounded font-bold hover:bg-green-600 transition"
>
  Checkout
</Link>
    </div>
  );
}