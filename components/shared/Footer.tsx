import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3">Shop</h2>
          <p className="text-gray-400 text-sm">
            Your trusted store for quality products at the best price.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-300">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@shop.com</p>
          <p className="text-sm text-gray-400">Phone: +123 456 789</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} Shop. All rights reserved.
      </div>
    </footer>
  );
}
