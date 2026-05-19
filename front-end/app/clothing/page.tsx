"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
   stock: number;
  };

export default function ClothingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/products"
        );

        const data = await res.json();

        const clothingOnly = data.filter(
          (item: Product) =>
            item.category.toLowerCase() === "clothing"
        );

        setProducts(clothingOnly);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading clothing...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-green-500 mb-4">
        Clothing Collection
      </h1>

      <p className="text-gray-400 mb-10">
        Premium fitness apparel.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
          >
            <div className="bg-gray-900 p-4 rounded-2xl hover:scale-105 transition">

              <div className="relative h-80 bg-gray-800 rounded mb-4 flex items-center justify-center">
                        <Image
              src={`/images/${product.image}`}
              alt={product.name}
              fill
              className="object-cover  absolute w-full"
            />
              </div>

              <h2 className="font-bold text-xl">
                {product.name}
              </h2>

              <p className="text-gray-400 text-sm">
                {product.category}
              </p>

              <p className="text-green-500 mt-2 font-bold">
                ${product.price}
              </p>
              <p
  className={`mt-2 text-sm font-semibold ${
    product.stock > 0
      ? "text-green-500"
      : "text-red-500"
  }`}
>
  {product.stock > 0
    ? `In Stock (${product.stock})`
    : "Out of Stock"}
</p>

            </div>
          </Link>
        ))}

      </div>

      <div className="mt-10">
        <Link
          href="/shop"
          className="text-green-500 hover:underline"
        >
          ← Back to Shop
        </Link>
      </div>

    </div>
  );
}