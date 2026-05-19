"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  sizes: string[];
  colors: string[];
};

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `http://localhost:3001/api/products/${id}`
      );

      const data = await res.json();
      setProduct(data);

      setSize(data.sizes?.[0] || "");
      setColor(data.colors?.[0] || "");
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "123",
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        size,
        color,
      }),
    });

    alert("Added to cart ✅");
  };

    const sizes =
  product?.sizes?.length
    ? product.sizes
    : ["s", "m", "l", "xl"];

     const colors =
  product?.colors?.length
    ? product.colors
    : ["red", "yellow", "blue", "black","white"];

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <div>
          <div className="relative bg-gray-900 rounded-3xl h-[550px] flex items-center justify-center shadow-xl">
                 <Image
                       src={`/images/${product.image}`}
                       alt={product.name}
                       priority
                       fill
sizes="(max-width: 768px) 100vw, 50vw"
                       className="object-cover  absolute"
                     />
          </div>

          {/* thumbnails */}
         <div className="grid grid-cols-4 gap-3 mt-4">
  {["shorts.jpg", "hoodie.jpg", "short-2.jpg", "hero.jpg"].map((item) => (
    <div
      key={item}
      className="relative h-24 bg-gray-900 rounded-xl overflow-hidden"
    >
      <Image
        src={`/images/${item}`}
        alt={item}
        fill
              className="object-cover"
      />
    </div>
  ))}
</div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-green-500 uppercase text-sm mb-2">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold mb-4">
            {product.name}
          </h1>

          {/* rating */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="text-gray-400 ml-2">
              ({product.rating})
            </span>
          </div>

          <p className="text-4xl font-bold text-green-400 mb-6">
            ${product.price}
          </p>

          <p className="text-gray-400 leading-7 mb-8">
            {product.description}
          </p>

          {/* stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="bg-red-500 px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* sizes */}
         <div className="mb-6">
  <p className="mb-2 font-semibold">
    Select Size
  </p>

  <select
    value={size}
    onChange={(e) => setSize(e.target.value)}
    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
  >
    <option value="">
      Choose a size
    </option>

    {sizes.map((s) => (
      <option key={s} value={s}>
        {s}
      </option>
    ))}
  </select>
</div>

          {/* colors */}
          <div className="mb-6">
            <p className="mb-2 font-semibold">
              Select Color
            </p>

            <select
    value={color}
    onChange={(c) => setColor(c.target.value)}
    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
  >
    <option value="">
      Choose a color
    </option>

    {colors.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ))}
  </select>
          </div>

          {/* quantity */}
          <div className="mb-8">
            <p className="mb-2 font-semibold">
              Quantity
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setQty((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-10 h-10 bg-gray-800 rounded-xl"
              >
                -
              </button>

              <span className="text-xl font-bold">
                {qty}
              </span>

              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="w-10 h-10 bg-gray-800 rounded-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* button */}
          <button
            onClick={addToCart}
            className="w-full bg-green-500 text-black py-4 rounded-2xl font-bold text-lg hover:bg-green-400 transition"
          >
            Add To Cart
          </button>

          {/* infos */}
          <div className="mt-8 space-y-4 text-gray-400">

            <div className="flex items-center gap-3">
              <Truck size={20} />
              Free delivery in Tunisia
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              Secure payment guaranteed
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}