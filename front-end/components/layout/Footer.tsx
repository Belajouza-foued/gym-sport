"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="sticky top-0 z-50 bg-black/90  border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h1 className="text-2xl font-bold text-green-500 mb-4">
            GYM STORE
          </h1>

          <p className="text-gray-400 text-sm leading-6">
            Premium fitness products, supplements and sportswear for athletes.
            Build your body. Upgrade your life.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h2 className="font-bold mb-4">Shop</h2>

          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <Link href="/shop">All Products</Link>
            <Link href="/clothing">Clothing</Link>
            <Link href="/supplement">Supplements</Link>
            <Link href="/accessory">Accessories</Link>
          </div>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="font-bold mb-4">Support</h2>

          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="font-bold mb-4">Follow Us</h2>

          <div className="flex gap-4 text-gray-400">

          <a href="#" className="hover:scale-110 transition">
  <FaInstagram className="" />
</a>

<a href="#" className="hover:scale-110 transition">
  <FaFacebook className="" />
</a>

<a href="#" className="hover:scale-110 transition">
  <FaTwitter className="" />
</a>

            <a href="#">
              <FaEnvelope className="hover:text-green-500 transition" />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Gym Store. All rights reserved.
      </div>

    </footer>
  );
}