import React, { useState } from "react";
import ShowFoodModal from "./ShowFoodModal";

const TableFoodRow = ({
  columnItems,
  currentPage,
  limit,
  food,
  setChangeApi,
  setSelectedFoods,
}) => {
  const rowKeys = Object.keys(columnItems).slice(
    1,
    Object.keys(columnItems).length - 1
  );
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedFoods((prevState) => [...prevState, e.target]);
    } else {
      setSelectedFoods((prevState) =>
        prevState.filter((foods) => {
          return (
            foods.id.split("food-").join("") !==
            e.target.id.split("food-").join("")
          );
        })
      );
    }
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          name={`food-${food._id}`}
          id={`food-${food._id}`}
          onChange={(e) => handleChange(e)}
        />
      </td>
      <td>{currentPage * limit + columnItems.serial}</td>
      {rowKeys.map((key, index) => (
        <td key={index}>{columnItems[key]}</td>
      ))}
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setOpenModal(true)}
        >
          Edit
        </button>
        {/* Add a modal form for each */}
        <ShowFoodModal
          food={food}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setChangeApi={setChangeApi}
        />
      </td>
    </tr>
  );
};

export default TableFoodRow;
