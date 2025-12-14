import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';



const ProductsPage = () => {
  const [sortBy, setSortBy] = useState('default');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  // Initialize scroll animations
  useScrollAnimation();

  // Get unique sizes for filter
  const uniqueSizes = useMemo(() => {
    const sizes = [...new Set(products.map(p => p.size.split(' ')[0]))];
    return sizes;
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const meetsSizeFilter = sizeFilter === 'all' || product.size.includes(sizeFilter);
      const meetsPriceFilter = product.price >= priceRange.min && product.price <= priceRange.max;
      return meetsSizeFilter && meetsPriceFilter;
    });

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [sortBy, sizeFilter, priceRange]);

  const clearFilters = () => {
    setSortBy('default');
    setSizeFilter('all');
    setPriceRange({ min: 0, max: 5000 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Products" 
          description="Discover our premium collection of photo frames and handmade artwork"
          center
        />

        {/* Filters Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Sizes</option>
                {uniqueSizes.map(size => (
                  <option key={size} value={size}>{size}"</option>
                ))}
              </select>
            </div>

            {/* Price Range Min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price: ₹{priceRange.min}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Price Range Max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ₹{priceRange.max}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-sm"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={`${product.image}`}
                title={product.title}
                price={product.price}
                size={product.size}
                description={product.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
