"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = 2; // 🔥 plus tard vient du store

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
          <Link className="hover:text-green-400 transition" href="/orders">
            Orders
          </Link>
          <Link className="hover:text-green-400 transition" href="/dashboard">
            Dashboard
          </Link>
          
         <div className="relative group">

  {/* BUTTON */}
  <button className="text-white px-6 py-3 rounded-lg  transition">
    Gender
  </button>

  {/* DROPDOWN */}
  <div className="absolute hidden group-hover:flex flex-col bg-gray-900 border border-gray-700 rounded-lg mt-2 w-40 z-50">

    <Link
      href="/products"
      className="px-4 py-3 hover:bg-gray-800 transition"
    >
      Men
    </Link>

    <Link
      href="/products"
      className="px-4 py-3 hover:bg-gray-800 transition"
    >
      Women
    </Link>

    <Link
      href="/products"
      className="px-4 py-3 hover:bg-gray-800 transition"
    >
      Kids
    </Link>

  </div>
</div>
        </nav>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-6">

          {/* CART */}
          <Link href="/cart" className="relative text-green-400 transition">
            <ShoppingCart size={22} />

            {/* badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          <Link href="/login" className="hover:text-green-400 transition">
            <User size={22} />
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