"use client";

import Image from "next/image";
import Link from "next/link";

// Define product categories with images and links
const productCategories = [
  {
    name: "Chesterfield Lounger Sofa",
    image: "/images/sofa1.jpg",
    link: "/products/chesterfield-lounger-sofa",
  },
  {
    name: "Ottoman Bench Sofa",
    image: "/images/benchsofa1.jpg",
    link: "/products/ottoman-bench-sofa",
  },
  {
    name: "Carved Sofas",
    image: "/images/carvedsofa6.jpg",
    link: "/products/carved-sofas",
  },
  {
    name: "Dining and Lighting",
    image: "/images/dine3.jpg",
    link: "/products/dining-and-lighting",
  }
];

function Products() {
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-800 mb-8">
            Explore Our Products
          </h1>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {productCategories.map((category, index) => (
            <Link href={category.link} key={index}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-600"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Custom Orders Banner */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center bg-[#F5F2EF] rounded-xl p-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-gray-600 mb-8">
            We specialize in creating custom pieces tailored to your specific needs and preferences.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Request Custom Order
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Products; 