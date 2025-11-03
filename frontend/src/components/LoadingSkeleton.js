import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 12 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-thumbnail"></div>
          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-title short"></div>
            <div className="skeleton-channel"></div>
            <div className="skeleton-meta"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
