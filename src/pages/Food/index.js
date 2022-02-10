import React, { useState } from 'react';
import AddFood from '../../components/AddFood';
import ShowFood from '../../components/ShowFood';

const Food = () => {
  const [changeApi, setChangeApi] = useState(false);
  return (
    <div className='py-5 container'>
      <AddFood changeApi={changeApi} setChangeApi={setChangeApi} />
      <div className="my-5"></div>
      <ShowFood changeApi={changeApi} setChangeApi={setChangeApi} />
    </div>
  );
};

export default Food;