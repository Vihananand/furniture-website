import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#FDFBF8] pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Augusta Luxury Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            <div className="flex items-baseline mt-4">
              <span className="text-xl font-cormorant font-semibold tracking-wide">AUGUSTA</span>
              <span className="text-xl font-cormorant font-semibold tracking-wide ml-2">LUXURY</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              © 2025 Augusta Luxury, Inc.
              <br />
              All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-order"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Custom Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs" className="text-gray-500 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-500">
                <span className="block">979-707-6363</span>
              </li>
              <li>
                <a
                  href="mailto:info@augustaluxury.com"
                  className="text-gray-500 hover:text-gray-900"
                >
                  info@augustaluxury.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 