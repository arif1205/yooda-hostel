import React, { useState } from "react";
import AddStudent from "../../components/AddStudent";
import ShowStudent from "../../components/ShowStudent";

const Students = () => {
  const [changeApi, setChangeApi] = useState(false);
  
  return (
    <div className="py-5 container">
      <AddStudent changeApi={changeApi} setChangeApi={setChangeApi} />
      <div className="my-5"></div>
      <ShowStudent changeApi={changeApi} setChangeApi={setChangeApi} />
    </div>
  );
};

export default Students;
