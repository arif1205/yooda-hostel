import React from 'react';

const ShowAlert = ({boldText, mainText, type}) => {
  return (
    <div className={`alert alert-${type} fade show my-2`} role="alert">
      <strong>{boldText}</strong> {mainText}
    </div>
  );
};

export default ShowAlert;