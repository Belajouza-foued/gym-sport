"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [role, setRole] = useState("");
 useEffect(() => {
  fetch("http://localhost:3001/api/cart/123")
    .then((res) => res.json())
    .then((data) => {
      setCartCount(data.items?.length || 0);
    })
    .catch((err) => {
      console.log("Cart error:", err);
    });
}, []);
useEffect(() => {
  const storedRole = localStorage.getItem("role");
  setRole(storedRole || "");
}, []);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-500 tracking-wider"
        >
          GYM STORE
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
          <Link className="hover:text-green-400 transition" href="/">
            Home
          </Link>
          <Link className="hover:text-green-400 transition" href="/shop">
            Shop
          </Link>
       {role === "admin" && (
  <Link
    className="hover:text-green-400 transition"
    href="/admin"
  >
    Dashboard
  </Link>
)}
          
         <div className="relative group">  {/* DROPDOWN */}
 <div className="flex gap-4">
   <Link href="/shop?gender=men" className="hover:text-green-400">Men</Link>
  <Link href="/shop?gender=women" className="hover:text-green-400">Women</Link>
  <Link href="/shop?gender=kids"className="hover:text-green-400">Kids</Link>
</div>
</div>
        </nav>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-6">

      {/* CART */}
      <Link
        href="/cart"
        className="relative text-green-400 transition"
      >

        <ShoppingCart size={22} />

        {/* BADGE */}
        {cartCount > 0 && (

          <span
            className="
              absolute
              -top-2
              -right-2
              bg-green-500
              text-black
              text-xs
              w-5
              h-5
              flex
              items-center
              justify-center
              rounded-full
              font-bold
            "
          >
            {cartCount}
          </span>

        )}

      </Link>

      {/* USER */}
      <Link
        href="/login"
        className="hover:text-green-400 transition"
      >
        <User className="text-gray-200 rounded-full" size={22} />
      </Link>

    </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </header>
  );
}