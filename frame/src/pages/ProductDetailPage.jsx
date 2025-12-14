import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ImageSlider from '../components/ui/ImageSlider';
import Button from '../components/ui/Button';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';

const getBaseUrl = () => {
  return './';
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [liked, setLiked] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find product by ID - compare as strings since URL params are strings
  const product = products.find(p => String(p.id) === String(id));

  // If product not found, show 404
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  // If product has multiple images, use slider; otherwise use single image
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleAddToCart = () => {
    if (!selectedSize && product.availableSizes && product.availableSizes.length > 0) {
      alert('Please select a size');
      return;
    }
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === product.id && item.selectedSize === selectedSize
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        selectedSize: selectedSize || null,
        quantity: 1,
        size: product.size,
        material: product.material || 'High-quality materials'
      };
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg p-8">
          {/* Product Images */}
          <div>
            {hasMultipleImages ? (
              <ImageSlider images={product.images.map(img => `${getBaseUrl()}${img}`)} alt={product.title} />
            ) : (
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={`${getBaseUrl()}${product.image}`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              {product.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-amber-600">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleAddToCart} className="flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLike}
                className={`flex items-center justify-center ${liked ? 'text-red-600 border-red-600' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </Button>
            </div>

            {/* Share Button */}
            <Button 
              variant="ghost" 
              onClick={handleShare}
              className="flex items-center justify-center w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Product
            </Button>

            {/* Trust Badges */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-medium text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-medium text-gray-900">Quality Assured</p>
                    <p className="text-sm text-gray-600">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">7-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="font-medium text-gray-600 w-32">Material:</dt>
                  <dd className="text-gray-900">{product.material || 'High-quality materials'}</dd>
                </div>
                <div className="flex">
                  <dt className="font-medium text-gray-600 w-32">Dimensions:</dt>
                  <dd className="text-gray-900">{product.size}</dd>
                </div>
                <div className="flex">
                  <dt className="font-medium text-gray-600 w-32">Weight:</dt>
                  <dd className="text-gray-900">{product.weight || 'Varies by size'}</dd>
                </div>
                <div className="flex">
                  <dt className="font-medium text-gray-600 w-32">Category:</dt>
                  <dd className="text-gray-900">{product.category || 'Photo Frame'}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Care Instructions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Clean with soft, dry cloth</li>
                <li>• Avoid direct sunlight</li>
                <li>• Keep away from moisture</li>
                <li>• Handle with care to prevent scratches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
