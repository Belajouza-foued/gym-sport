"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-10 bg-black text-white min-h-screen">

      <h1 className="text-2xl mb-6">Products</h1>

      <div className="grid gap-4">

        {products.map((p: any) => (
          <div key={p._id} className="bg-gray-900 p-4 rounded-xl flex gap-4">

            <div className="relative w-20 h-20">
              <Image
                src={`/images/${p.image}`}
                alt={p.name}
                fill
                className="object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-green-400">${p.price}</p>
              <p className="text-gray-400">Stock: {p.stock}</p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}