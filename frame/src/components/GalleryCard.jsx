import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';

const getBaseUrl = () => {
  return './';
};

const GalleryCard = ({ id, title, category, coverImage, date, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', coverImage);
    // Set a placeholder background color
    e.target.style.backgroundColor = '#e5e7eb';
    e.target.alt = 'Image not available';
  };

  return (
    <Link 
      to={`/gallery/${id}`}
      onClick={handleClick}
      className="group block bg-white rounded-lg shadow-md overflow-hidden card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={`${getBaseUrl()}${coverImage}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-white">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">View Details</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Date Badge (if provided) */}
        {date && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gray-600" />
              <span className="text-xs text-gray-700">{date}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-black text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Category Text */}
        <p className="text-sm text-gray-600 mb-3">
          {category}
        </p>

        {/* View Details Link */}
        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
          <span className="text-sm font-medium">View Project</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
