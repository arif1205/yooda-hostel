import React, { useState } from "react";
import ShowStudentModal from "./ShowStudentModal";

const TableRow = ({
  columnItems,
  currentPage,
  limit,
  student,
  setChangeApi,
  setSelectedStudents,
}) => {
  const rowKeys = Object.keys(columnItems).slice(
    1,
    Object.keys(columnItems).length - 1
  );
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedStudents((prevState) => [...prevState, e.target]);
    } else {
      setSelectedStudents((prevState) =>
        prevState.filter((students) => {
          return (
            students.id.split("student-").join("") !==
            e.target.id.split("student-").join("")
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
          name={`student-${student._id}`}
          id={`student-${student._id}`}
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
          Edit?
        </button>
        {/* Add a modal form for each */}
        <ShowStudentModal
          student={student}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setChangeApi={setChangeApi}
        />
      </td>
    </tr>
  );
};

export default TableRow;
