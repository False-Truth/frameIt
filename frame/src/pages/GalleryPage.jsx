import React, { useState, useMemo } from 'react';
import { galleryItems } from '../data/gallery';
import GalleryCard from '../components/GalleryCard';
import SectionHeading from '../components/ui/SectionHeading';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Filter, Grid3X3, List, Search } from 'lucide-react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [loading, setLoading] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(galleryItems.map(item => item.category))];
    return cats;
  }, []);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    let filtered = galleryItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    // Simulate loading for better UX
    setTimeout(() => setLoading(false), 300);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <SectionHeading
            title="Our Gallery"
            subtitle="Explore our collection of beautiful photo frames and custom artwork projects"
            center
          />
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Browse through our completed projects, custom frame designs, and artwork showcases. 
            Each piece tells a unique story of craftsmanship and creativity.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and View Mode */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  title="List View"
                >
                  <List className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {galleryItems.length} projects
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && (selectedCategory !== 'All' ? ' matching' : ' matching')} "{searchTerm}"
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <>
            {filteredItems.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-6'
              }>
                {filteredItems.map((item) => (
            <GalleryCard
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              coverImage={item.images && item.images.length > 0 ? item.images[0] : item.coverImage}
              date={item.date}
            />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Additional Info Section */}
        <div className="mt-16 bg-amber-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {galleryItems.length}+
              </div>
              <p className="text-gray-700 font-medium">Completed Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {categories.length - 1}
              </div>
              <p className="text-gray-700 font-medium">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                100%
              </div>
              <p className="text-gray-700 font-medium">Customer Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have a Custom Project in Mind?
          </h2>
          <p className="text-gray-600 mb-6">
            Let us bring your vision to life with our custom framing and artwork services.
          </p>
          <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
