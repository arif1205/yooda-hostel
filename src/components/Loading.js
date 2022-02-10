import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary my-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;