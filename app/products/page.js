"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagesByTag, transformToProducts } from '@/utils/cloudinary';
import { useSearchParams } from 'next/navigation';

// Category configuration
const CATEGORIES = {
  'all': {
    name: 'All Products',
    description: 'Explore our complete collection of premium furniture',
  },
  'carved-sofas': {
    name: 'Carved Sofas',
    description: 'Discover our exquisite collection of meticulously hand-carved sofas, showcasing intricate designs and exceptional artisanship.',
    tag: 'carved-sofas'
  },
  'ottoman-bench-sofa': {
    name: 'Ottoman & Bench Sofas',
    description: 'Explore our elegant collection of ottoman and bench sofas, featuring premium craftsmanship and luxurious designs for any sophisticated interior.',
    tag: 'ottoman-bench-sofa'
  },
  'dining-lighting': {
    name: 'Dining & Lighting',
    description: 'Discover our sophisticated collection of dining furniture and lighting fixtures, combining elegant designs with premium materials for a refined dining experience.',
    tag: 'dining-lighting'
  },
  'chesterfield-lounger-sofa': {
    name: 'Chesterfield & Lounger Sofas',
    description: 'Explore our luxurious Chesterfield and Lounger Sofa collection, featuring timeless designs with deep button tufting and premium upholstery for ultimate comfort and elegance.',
    tag: 'chesterfield-lounger-sofa'
  }
};

export default function Products() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam && CATEGORIES[categoryParam] ? categoryParam : 'all');
  const [showFullCategoryView, setShowFullCategoryView] = useState(!!categoryParam);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryImages, setCategoryImages] = useState([]);
  const [allProducts, setAllProducts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all products for the main grid
  useEffect(() => {
    async function fetchAllProducts() {
      setIsLoading(true);
      try {
        // Fetch products for each category except 'all'
        const fetchPromises = Object.entries(CATEGORIES)
          .filter(([id]) => id !== 'all')
          .map(async ([categoryId, info]) => {
            const images = await getImagesByTag(info.tag);
            return { 
              categoryId, 
              products: transformToProducts(images, info.name) 
            };
          });

        const results = await Promise.all(fetchPromises);
        
        // Update state with fetched products
        const products = {};
        results.forEach(result => {
          products[result.categoryId] = result.products;
        });
        
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  // Fetch category-specific images when viewing a category
  useEffect(() => {
    if (showFullCategoryView && selectedCategory !== 'all') {
      const fetchCategoryImages = async () => {
        setIsLoading(true);
        try {
          const images = await getImagesByTag(CATEGORIES[selectedCategory].tag);
          setCategoryImages(images);
        } catch (error) {
          console.error('Failed to fetch category images:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchCategoryImages();
    }
  }, [selectedCategory, showFullCategoryView]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowFullCategoryView(categoryId !== 'all');
    
    // Update URL without navigation
    const url = new URL(window.location);
    if (categoryId === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', categoryId);
    }
    window.history.pushState({}, '', url);
  };

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

  // Get filtered products for the main grid
  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return Object.values(allProducts).flat();
    }
    return allProducts[selectedCategory] || [];
  };

  return (
    <div className="pt-20">
      {/* Hero Section with Category Navigation */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold text-center mb-8">
          {showFullCategoryView && selectedCategory !== 'all' 
            ? CATEGORIES[selectedCategory].name
            : 'Our Collection'}
        </h1>
        
        {showFullCategoryView && selectedCategory !== 'all' && (
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center">
            {CATEGORIES[selectedCategory].description}
          </p>
        )}
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(CATEGORIES).map(([id, info]) => (
            <button
              key={id}
              onClick={() => handleCategorySelect(id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === id
                  ? 'bg-[#526D5F] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {info.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Display Section */}
      <section className="container mx-auto px-6 mb-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#526D5F]"></div>
          </div>
        ) : showFullCategoryView && selectedCategory !== 'all' ? (
          /* Category Detail View */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {categoryImages.length > 0 ? categoryImages.map((image, index) => (
                <div key={image.public_id} className="group">
                  <div 
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={() => openImagePreview(image.secure_url)}
                  >
                    <Image
                      src={image.secure_url}
                      alt={`${CATEGORIES[selectedCategory].name} Design ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw"
                    />
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-20">
                  <p className="text-gray-500">No images found in this category.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Main Products Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredProducts().length > 0 ? getFilteredProducts().map((product) => (
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
            )) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Custom Order CTA */}
      <section className="container mx-auto px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center bg-[#F5F2EF] rounded-xl p-10">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold mb-6">
            Request Custom Order
          </h2>
          <p className="text-gray-600 mb-8">
            Our master craftsmen can create a bespoke design with custom patterns, dimensions, and finishes to match your vision.
          </p>
          <Link
            href="/custom-order"
            className="inline-block bg-[#526D5F] text-white px-8 py-3 rounded-md hover:bg-[#3A4F44] transition-colors"
          >
            Contact Us
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
                alt="Product Preview"
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