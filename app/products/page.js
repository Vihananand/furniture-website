"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = {
  benches: Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    name: `Luxury Ottoman ${i + 1}`,
    image: `/images/bs (${i + 1}).jpg`,
    category: 'Benches & Ottomans'
  })),
  
  sofas: Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    name: `Classic Sofa ${i + 1}`,
    image: `/images/cs (${i + 1}).jpg`,
    category: 'Classic Sofas'
  })),

  beds: Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: `Designer Bed ${i + 1}`,
    image: `/images/d (${i + 1}).jpg`,
    category: 'Beds & Daybeds'
  })),

  settees: Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    name: `Luxury Settee ${i + 1}`,
    image: `/images/s (${i + 1}).jpg`,
    category: 'Chaise Lounges & Settees'
  }))
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'benches', name: 'Benches & Ottomans' },
    { id: 'sofas', name: 'Classic Sofas' },
    { id: 'beds', name: 'Beds & Daybeds' },
    { id: 'settees', name: 'Chaise Lounges & Settees' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? Object.values(products).flat()
    : products[selectedCategory] || [];

  return (
    <div className="pt-20">
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold text-center mb-8">
          Our Collection
        </h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#526D5F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={`${product.category}-${product.id}`} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square rounded-t-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-cormorant text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.category}</p>
                <Link
                  href={`/custom-order?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`}
                  className="inline-block w-full bg-[#526D5F] text-white text-center px-6 py-2 rounded-md hover:bg-[#3A4F44] transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center bg-[#F5F2EF] rounded-xl p-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6">
            Request Custom Order
          </h2>
          <Link
            href="/custom-order"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 