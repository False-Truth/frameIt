import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { products } from '../data/products';
import { galleryItems } from '../data/gallery';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HomePage = () => {
  // Get first 4 products for preview
  const featuredProducts = products.slice(0, 4);
  // Get first 6 gallery items for preview
  const featuredGallery = galleryItems.slice(0, 6);

  // Apply scroll animations
  useScrollAnimation('.animate-on-scroll', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
  });

  useScrollAnimation('.animate-on-scroll-left', {
    x: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15
  });

  useScrollAnimation('.animate-on-scroll-right', {
    x: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15
  });

  useEffect(() => {
    // Add global smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add body loaded class for animations
    document.body.classList.add('body-loaded');
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.classList.remove('body-loaded');
    };
  }, []);

  const highlights = [
    {
      title: "Fast Delivery",
      description: "Quick and secure delivery to your doorstep",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    {
      title: "Custom Frames",
      description: "Personalized frames tailored to your needs",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Artwork Quality",
      description: "Premium quality materials and craftsmanship",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Special Offers",
      description: "Exclusive deals and discounts available",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      content: "Amazing quality frames! The craftsmanship is exceptional and the delivery was super fast.",
      rating: 5
    },
    {
      name: "Priya Patel",
      content: "Beautiful artwork and frames. Customer service was excellent throughout the process.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      content: "I ordered a custom frame and it exceeded my expectations. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/heroimage.jpg)',
            opacity: '0.6'
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block">Premium Photo</span>
            <span className="block">Frames &</span>
            <span className="block">Handmade Paintings</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-900 max-w-2xl mx-auto">
            Transform your memories into timeless art with our exquisite collection of custom frames and handmade artwork
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 border-white text-blue-900 hover:bg-white hover:text-blue-600 backdrop-blur-sm">
                View Products
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 border-white text-blue-900 hover:bg-white hover:text-blue-600 backdrop-blur-sm">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center p-4 sm:p-6 hover:shadow-lg transition-all hover:scale-105 animate-on-scroll">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Gallery Preview" 
            description="Explore our latest artwork and completed projects"
            center
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featuredGallery.map((item) => (
              <Link key={item.id} to={`/gallery/${item.id}`}>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 group animate-on-scroll">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-blue-600 text-xs sm:text-sm">{item.category}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="px-6 sm:px-8">
                Explore Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Products" 
            description="Discover our best-selling photo frames and artwork"
            center
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 group animate-on-scroll">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2">{product.size}</p>
                    <p className="text-blue-600 font-bold text-base sm:text-lg">₹{product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="px-6 sm:px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="What Our Customers Say" 
            description="Real experiences from our valued customers"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 italic text-sm sm:text-base">"{testimonial.content}"</p>
                <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
