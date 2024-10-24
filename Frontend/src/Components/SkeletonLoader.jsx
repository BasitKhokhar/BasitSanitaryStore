// SkeletonLoader.jsx
import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-2 p-2 border rounded-lg shadow-lg animate-pulse">
      {/* for Image  */}
      <div className="w-full h-64 bg-gray-300"></div>
      {/* for Text */}
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
