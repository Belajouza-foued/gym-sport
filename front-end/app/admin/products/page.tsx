"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-green-500">
          Admin Products
        </h1>

        <Link href="/admin/products/create">
          <button className="bg-green-500 text-black px-4 py-2 rounded">
            + Add Product
          </button>
        </Link>

      </div>

      {/* GRID */}
      <div className="grid gap-4">

        {products.map((p) => (

          <div
            key={p._id}
            className="bg-gray-900 p-4 rounded-xl flex items-center gap-4"
          >

            {/* IMAGE */}
            <div className="relative w-20 h-20">
              <Image
                src={`/images/${p.image}`}
                alt={p.name}
                fill
                className="object-cover rounded"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-green-400">${p.price}</p>
              <p className="text-gray-400 text-sm">
                Stock: {p.stock}
              </p>
              <p className="text-gray-500 text-xs">
                {p.category}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <Link href={`/admin/edit/${p._id}`}>
                <button className="bg-yellow-500 text-black px-3 py-1 rounded">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}