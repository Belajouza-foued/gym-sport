"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function SupplementPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const supplements = data.filter(
          (p: Product) => p.category === "supplement"
        );

        setProducts(supplements);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold text-green-500 mb-8">
        Accessories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-900 rounded-xl p-4"
          >

            {/* IMAGE */}
            <div className="relative h-72 mb-4">
              <Image
                src={`/images/${product.image}`}
                alt={product.name}
                fill
                className="object-contain rounded"
              />
            </div>

            {/* INFO */}
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-green-400 mt-2">
              ${product.price}
            </p>

            <Link
  href={`/product/${product._id}`}
  className="block w-full mt-4 bg-green-500 text-black py-2 rounded text-center font-bold"
>
  Add to Cart
</Link>

          </div>
        ))}

      </div>
    </div>
  );
}