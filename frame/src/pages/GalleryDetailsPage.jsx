import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { galleryItems } from '../data/gallery';
import ImageSlider from '../components/ui/ImageSlider';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Clock, 
  User, 
  Share2, 
  Heart,
  Play,
  Palette,
  Ruler,
  Package
} from 'lucide-react';

const getBaseUrl = () => {
  if (import.meta.env.DEV) return '/';
  return '/frameIt/';
};

const GalleryDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate loading and fetch project data
    const fetchProject = () => {
      setLoading(true);
      
      // Find the project by ID
      const foundProject = galleryItems.find(item => item.id === parseInt(id));
      
      if (foundProject) {
        setProject(foundProject);
        
        // Find related items (same category, excluding current item)
        const related = galleryItems
          .filter(item => item.category === foundProject.category && item.id !== parseInt(id))
          .slice(0, 4);
        setRelatedItems(related);
      }
      
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    // Handle like functionality
    console.log('Liked project:', project?.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The gallery project you're looking for doesn't exist.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-amber-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/gallery" className="text-gray-600 hover:text-amber-600">Gallery</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex-1">
              <Link 
                to="/gallery" 
                className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {project.category}
                </div>
                {project.date && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.duration}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={handleLike}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Add to favorites"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Share project"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Slider */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Gallery</h2>
              {project.images.length > 1 ? (
                <ImageSlider 
                  images={project.images} 
                  alt={project.title}
                />
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Video Section (if available) */}
            {project.video && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Video</h2>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={project.video}
                    title={`${project.title} Video`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
              <div className="prose prose-amber max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              
              {/* Materials */}
              {project.materials && project.materials.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Palette className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="font-medium text-gray-900">Materials Used</span>
                  </div>
                  <ul className="space-y-1">
                    {project.materials.map((material, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dimensions */}
              {project.dimensions && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Ruler className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="font-medium text-gray-900">Dimensions</span>
                  </div>
                  <p className="text-sm text-gray-600">{project.dimensions}</p>
                </div>
              )}

              {/* Frame Type */}
              {project.frameType && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Package className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="font-medium text-gray-900">Frame Type</span>
                  </div>
                  <p className="text-sm text-gray-600">{project.frameType}</p>
                </div>
              )}

              {/* Artist */}
              {project.artist && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="font-medium text-gray-900">Artist</span>
                  </div>
                  <p className="text-sm text-gray-600">{project.artist}</p>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Similar Project</h3>
              <p className="text-sm text-gray-700 mb-4">
                Interested in a custom project like this? Get a free consultation and quote.
              </p>
              <Link 
                to="/contact" 
                className="block w-full bg-amber-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/gallery/${item.id}`}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetailsPage;
