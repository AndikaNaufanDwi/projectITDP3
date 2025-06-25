import React from 'react';

const SkeletonLoader = ({ type = 'text', count = 1, width = 'full', height = '4', className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`h-${height} bg-gray-200 rounded ${width === 'full' ? 'w-full' : `w-${width}`} mb-2 ${className}`}></div>
        ));
      case 'title':
        return <div className={`h-6 bg-gray-200 rounded ${width === 'full' ? 'w-full' : `w-${width}`} mb-4 ${className}`}></div>;
      case 'avatar':
        return <div className={`h-${height} w-${height} bg-gray-200 rounded-full ${className}`}></div>;
      case 'image':
        return <div className={`h-${height} bg-gray-200 rounded ${width === 'full' ? 'w-full' : `w-${width}`} ${className}`}></div>;
      case 'card':
        return (
          <div className={`bg-white rounded-lg shadow-sm p-4 animate-pulse ${className}`}>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader;