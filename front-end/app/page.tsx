"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

export default function HomePage() {
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

  const featured = [
    {
      name: "Gym Shirt",
      price: 99,
      image: "t-shirt.webp",
    },
    {
      name: "Hoodie",
      price: 129,
      image: "capuche.webp",
    },
    {
      name: "Shorts",
      price: 69,
      image: "short-jaune.webp",
    },
    {
      name: "Shoes",
      price: 149,
      image: "sport-shoes.webp",
    },
  ]; 

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-green-500 font-semibold mb-3">
            NEW COLLECTION 2026
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Build Your{" "}
            <span className="text-green-500">
              Fitness
            </span>{" "}
            Style
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl">
            Premium gym clothing, accessories and
            supplements designed for performance and
            confidence.
          </p>

          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-green-500 text-black px-8 py-4 rounded-2xl font-bold hover:bg-green-400 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/shop"
              className="border border-gray-700 px-8 py-4 rounded-2xl hover:border-green-500 transition"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="bg-gray-900 relative rounded-3xl h-[500px] flex items-center justify-center overflow-hidden">

          <Image
            src="/images/hero.jpg"
            alt="Hero"
            fill
            className="object-cover absolute"
          />

          <h2 className="text-lg font-bold text-white absolute z-10">
            Gym Shirt
          </h2>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="px-6 md:px-20 py-16">

        <h2 className="text-3xl font-bold mb-8">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            href="/clothing"
            className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold mb-2">
              Clothing
            </h3>

            <p className="text-gray-400">
              Shirts, hoodies, shorts
            </p>
          </Link>

          <Link
            href="/accessory"
            className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold mb-2">
              Accessories
            </h3>

            <p className="text-gray-400">
              Bags, gloves, caps
            </p>
          </Link>

          <Link
            href="/supplement"
            className="bg-gray-900 p-8 rounded-3xl hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold mb-2">
              Supplements
            </h3>

            <p className="text-gray-400">
              Protein, vitamins, energy
            </p>
          </Link>

        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 md:px-20 py-16">

        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {featured.map((product, index) => (

            <Link
              key={index}
              href={`/product/${index}`}
              className="bg-gray-900 p-3 rounded-2xl hover:scale-105 transition block"
            >

              <div className="relative h-48 w-[60%] mx-auto bg-gray-800 rounded mb-4 overflow-hidden">

                <Image
                  src={`/images/${product.image}`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain"
                />

              </div>

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-green-500 mt-2 font-bold">
                ${product.price}
              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* PROMO */}
      <section className="px-6 md:px-20 py-20">

        <div className="bg-green-500 text-black rounded-3xl p-12 text-center">

          <h2 className="text-4xl font-bold mb-4">
            20% OFF First Order
          </h2>

          <p className="mb-6 text-lg">
            Join our fitness community today.
          </p>

          <Link
            href="/shop"
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold"
          >
            Start Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}