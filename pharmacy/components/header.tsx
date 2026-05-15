"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Нүүр", href: "/" },
    { label: "Эмийн сангууд", href: "/pharmacies" },
    { label: "Бүтээгдэхүүн", href: "/products" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
            <h1 className="font-bold text-gray-900 text-sm hidden sm:block">Pharmacy Finder</h1>
          </div>
          <div className="hidden md:block flex-1 max-w-md">
            <input placeholder="Эм, эмийн сан хайх..." className="w-full px-4 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden md:block bg-green-600 text-white px-4 py-1.5 rounded-md text-sm">Нэвтрэх</button>
            <button className="md:hidden p-2 rounded-lg text-gray-600">☰</button>
          </div>
        </div>
      </div>

      <nav className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-1">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  pathname === href
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

    </div>
  );
}