import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';

const DashboardPage = () => {
  const features = [
    {
      title: 'Database Query Maker',
      description: 'View and filter order data with download options',
      icon: '🗄️',
      link: '/database-query',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Products',
      description: 'Manage and view all products',
      icon: '📦',
      link: '/products',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Gallery',
      description: 'View photo gallery and collections',
      icon: '🖼️',
      link: '/gallery',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Billing',
      description: 'Generate and manage bills',
      icon: '🧾',
      link: '/billing',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Contact',
      description: 'Contact information and support',
      icon: '📞',
      link: '/contact',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Home',
      description: 'Go to homepage',
      icon: '🏠',
      link: '/',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Dashboard"
          subtitle="Navigate through different features and pages"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}></div>
              <div className="relative p-8 text-white">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/90 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm">Access</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600 mt-1">Total Orders</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 mt-1">Products</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600 mt-1">Gallery Items</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600 mt-1">Active Features</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
