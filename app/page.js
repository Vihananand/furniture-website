"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Chesterfield Lounger Sofa",
    image: "/images/sofa1.jpg",
    link: "/products/chesterfield-lounger-sofa",
  },
  {
    id: 2,
    name: "Ottoman Bench Sofa",
    image: "/images/benchsofa1.jpg",
    link: "/products/ottoman-bench-sofa",
  },
  {
    id: 3,
    name: "Carved Sofas",
    image: "/images/carvedsofa1.jpg",
    link: "/products/carved-sofas",
  },
  {
    id: 4,
    name: "Dining and Lighting",
    image: "/images/dine3.jpg",
    link: "/products/dining-and-lighting",
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm text-gray-600 mb-4">PREMIUM FURNITURE</h2>
            <h1 className="flex flex-col mb-6">
              <span className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide leading-tight">
                AUGUSTA
              </span>
              <span className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide">
                LUXURY
              </span>
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome to our exclusive furniture collection, where we meticulously craft
              high-quality pieces that transform your living space into a sanctuary of elegance.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
            >
              Explore Our Collection
            </Link>
          </div>
          <div className="relative aspect-square rounded-full overflow-hidden">
            <Image
              src="/images/carvedsofa16.jpg"
              alt="Premium Luxury Sofa"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products with New Carousel */}
      <section className="container mx-auto px-6 py-20 relative">
        <h2 className="text-gray-600 mb-4">Discover Our Signature Pieces</h2>
        <h3 className="font-cormorant text-4xl md:text-5xl font-semibold mb-12">
          CRAFTED FOR ELEGANCE
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link href={product.link} key={product.id}>
              <div className="space-y-4 group cursor-pointer">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h4 className="font-cormorant text-xl font-semibold">{product.name}</h4>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Quality Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-gray-600 mb-4">About Our Craftsmanship</h2>
        <h3 className="font-cormorant text-4xl md:text-5xl font-semibold mb-12">
          A LEGACY OF EXCELLENCE
        </h3>
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src="/images/sofa2.jpg"
            alt="Our Craftsmanship"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Care Section */}
      <section className="bg-[#526D5F] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="flex items-baseline justify-center text-4xl md:text-5xl mb-6">
            <span className="font-cormorant font-semibold tracking-wide">AUGUSTA</span>
            <span className="font-cormorant font-semibold tracking-wide ml-3">LUXURY</span>
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            At Augusta Luxury, we take great pride in our work and are
            dedicated to creating exceptional pieces that last a lifetime.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#C4A484] text-white px-8 py-3 rounded-md hover:bg-[#A88B6B] transition-colors"
          >
            Request Custom Order
          </Link>
        </div>
      </section>
    </div>
  );
}
