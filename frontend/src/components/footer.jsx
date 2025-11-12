import { ShoppingBag, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ShoppingBag className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold text-white">QuickCart</span>
        </div>
        <p className="mb-4">Your trusted shopping companion</p>
        <div className="flex items-center justify-center space-x-2 mb-4 text-emerald-400">
          <Mail className="w-4 h-4" />
          <a
            href="dayajoshi1222@gmail.com"
            className="hover:text-emerald-300 transition"
          >
            dayajoshi1222@gmail.com
          </a>
        </div>
        <p className="text-sm">&copy; 2025 QuickCart. All rights reserved.</p>
      </div>
    </footer>
  );
}
