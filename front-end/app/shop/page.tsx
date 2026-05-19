"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [maxPrice, setMaxPrice] = useState(1000);
const router = useRouter();

  const addToCart = async (product: Product) => {
  try {
    const res = await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "123", // temporaire
        productId: product._id,
        name: product.name,
       price: product.price,
        quantity: 1,
      }),
    });

    const data = await res.json();

    console.log("Cart updated:", data);

    alert("Product added to cart ✅");
  } catch (error) {
    console.log(error);
    alert("Error adding product ❌");
  }
};

  // 🔥 fetch backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Error loading products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
const filteredProducts = products.filter((p) => {
  return (
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || p.category === category) &&
    p.price <= maxPrice
  );
});
  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      <h1 className="text-3xl font-bold text-green-500 mb-8">
        Our Products
      </h1>
          {/* searchbar */}
          <div className="mb-6 grid md:grid-cols-3 gap-4">

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search products..."
    className="p-2 rounded bg-gray-900 text-white"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* CATEGORY */}
  <select
    className="p-1 rounded bg-gray-900 text-white"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="all">All</option>
    <option value="fitness">Fitness</option>
    <option value="shirt">Shirts</option>
    <option value="supplement">Supplements</option>
  </select>

  {/* PRICE */}
 <input
  type="text"
  placeholder="Search products..."
  className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-green-500"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
</div>

<p className="text-gray-400 mb-4">
  Max Price: ${maxPrice}
</p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredProducts.map((product) => (          
          <div
            key={product._id}
            className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition"
          >
             <Link href={`/product/${product._id}`}></Link>
            {/* IMAGE */}
            <div className="relative h-80 bg-gray-800 rounded mb-4 flex items-center justify-center">
                                  <Image
                        src={`/images/${product.image}`}
                        alt={product.name}
                           fill
                        className="object-cover  absolute w-full"
                      />
                        </div>

            {/* INFO */}
            <h2 className="text-lg font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-400 text-sm">
              {product.category}
            </p>

            <p className="text-green-500 font-bold mt-2">
              ${product.price}
            </p>

            {/* BUTTON */}
        <button
  onClick={() => router.push(`/product/${product._id}`)}
  className="mt-4 w-full bg-green-500 text-black py-2 rounded hover:bg-green-400"
>
  Add to Cart
</button>


          </div>
        ))}

      </div>
    </div>
  );
}