"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback} from "react";

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
        
        <ProductCarousel products={products} />
        
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

      {/* Collection Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-gray-600 mb-4">Explore Our Collections</h2>
        <h3 className="font-cormorant text-4xl md:text-5xl font-semibold mb-12">
          DISCOVER THE PERFECT PIECE
        </h3>
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src="/images/benchsofa8.jpg"
            alt="Our Collection"
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

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  
  const getProductsPerSlide = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 3;
    }
    return 3; // Default for SSR
  };
  
  const [productsPerSlide, setProductsPerSlide] = useState(3);
  
  useEffect(() => {
    setProductsPerSlide(getProductsPerSlide());
    
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalSlides = Math.ceil(products.length / productsPerSlide);
  const maxIndex = Math.max(0, totalSlides - 1);

  const nextSlide = useCallback(() => {
    setCurrentIndex(current => current >= maxIndex ? 0 : current + 1);
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(current => current <= 0 ? maxIndex : current - 1);
  }, [maxIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [productsPerSlide, currentIndex, maxIndex]);

  const handleTouchStart = (e) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchPosition) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchPosition(null);
    }
  };

  const startIndex = currentIndex * productsPerSlide;
  const visibleProducts = products.slice(startIndex, Math.min(startIndex + productsPerSlide, products.length));

  const gridCols = productsPerSlide === 1 
    ? "grid-cols-1" 
    : productsPerSlide === 2 
      ? "grid-cols-1 md:grid-cols-2" 
      : "grid-cols-1 md:grid-cols-3";

  return (
    <div className="relative max-w-7xl mx-auto">
      <div 
        className="relative overflow-hidden" 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="transition-transform duration-500 ease-out">
          <div className={`grid ${gridCols} gap-8`}>
            {visibleProducts.map((product) => (
              <Link href={product.link} key={product.id}>
                <div className="space-y-4 group cursor-pointer">
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h4 className="font-cormorant text-xl font-semibold">{product.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 z-10"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#526D5F]' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
