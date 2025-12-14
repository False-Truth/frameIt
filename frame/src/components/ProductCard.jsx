import React from 'react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';

const getBaseUrl = () => {
  return './';
};

const formatImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it already starts with the base path, don't double it
  if (imagePath.startsWith(getBaseUrl())) {
    return imagePath;
  }
  
  // Combine base URL with image path
  return `${getBaseUrl()}${imagePath}`;
};

const ProductCard = ({ 
  image, 
  title, 
  price, 
  size, 
  description, 
  id 
}) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-blue-100 relative">
        <img
          src={formatImagePath(image)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          {size}
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
          <p className="text-blue-600 font-bold text-xl sm:text-2xl">₹{price}</p>
            <p className="text-xs text-gray-500 mt-1">Premium Quality</p>
          </div>
        </div>
        
        <Link to={`/products/${id}`}>
          <Button className="w-full group-hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            <span className="flex items-center justify-center">
              View Details
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
