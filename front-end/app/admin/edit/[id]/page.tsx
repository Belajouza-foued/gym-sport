"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Product = {
    name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
};

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  // GET PRODUCT BY ID
useEffect(() => {
  if (!id) return;

  fetch(`http://localhost:3001/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct(data));
}, [id]);

  // UPDATE PRODUCT
const updateProduct = async () => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      }
    );

    if (!res.ok) {
      alert("Update failed ❌");
      return;
    }

    alert("Product updated ✅");
    router.push("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

  if (!product) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center flex-col justify-center text-white p-10">

      <h1 className="text-3xl font-bold  text-green-500 mb-6 ">
        Edit Product
      </h1>

      {/* NAME */}
      <input
        className="block w-full p-2 mb-3 max-w-2xl text-white border border-white"
        value={product.name}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        type="number"
        className="block w-full p-2 mb-3 text-white max-w-2xl border border-white"
        value={product.price}
        onChange={(e) =>
          setProduct({
            ...product,
            price: Number(e.target.value),
          })
        }
      />

      {/* STOCK */}
      <input
        type="number"
        className="block w-full p-2 mb-3 text-white max-w-2xl border border-white"
        value={product.stock}
        onChange={(e) =>
          setProduct({
            ...product,
            stock: Number(e.target.value),
          })
        }
      />

      {/* CATEGORY */}
      <input
        className="block w-full p-2 mb-3 text-white max-w-2xl border border-white"
        value={product.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value,
          })
        }
      />

      {/* SAVE */}
      <button
        onClick={updateProduct}
        className="bg-green-500 text-black px-6 py-2 rounded"
      >
        Save Changes
      </button>

    </div>
  );
}