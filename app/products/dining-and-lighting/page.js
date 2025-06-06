"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DiningAndLightingPage() {
  // Generate array of image paths for Dining and Lighting collection
  const images = Array.from({ length: 18 }, (_, i) => `/images/dine${i + 1}.jpg`);
  
  // State for image preview modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Functions to handle image preview modal
  function openImagePreview(image) {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }

  function closeImagePreview() {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-800 mb-8">
            Dining and Lighting
          </h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Elevate your dining experience with our stunning collection of dining furniture and exquisite lighting options for a perfect ambiance.
          </p>
          <div className="flex justify-center mb-12">
            <Link href="/products" className="text-[#526D5F] hover:text-[#3A4F44] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="group">
              <div 
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => openImagePreview(image)}
              >
                <Image
                  src={image}
                  alt={`Dining and Lighting Design ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="container mx-auto px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center bg-[#F5F2EF] rounded-xl p-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            Need Custom Dining Furniture?
          </h2>
          <p className="text-gray-600 mb-8">
            Our expert craftsmen can create custom dining tables, chairs, and lighting fixtures tailored to your specific requirements and interior design.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Request Custom Order
          </Link>
        </div>
      </section>

      {/* Image Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeImagePreview}>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
              onClick={closeImagePreview}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Dining and Lighting Preview"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 