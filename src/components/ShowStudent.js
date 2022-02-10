import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "./Loading";
import TableStudentRow from "./TableStudentRow";

const ShowStudent = ({ changeApi, setChangeApi }) => {
  const [students, setStudents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://yooda-hostel-12.herokuapp.com/students?_page=${
            currentPage + 1
          }&_limit=${Number(limit)}`
        );
        setStudents(response.data.result);
        setPageCount(response.data.pageCount);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, [currentPage, changeApi, limit]);

  // handle pagination
  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  // make unchecked all checkboxes
  const handleUnChecked = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].checked = false;
    }
  };

  // handle select all
  const handleToggleSelectAll = (e) => {
    const { checked } = e.target;
    let checkboxes = document.querySelectorAll("input[name^=student-]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = checked;
    }

    const selectedCheckboxes = [];
    [...checkboxes].forEach((checkbox) => {
      if (checkbox.checked) selectedCheckboxes.push(checkbox);
    });

    setSelectedStudents(selectedCheckboxes);
  };

  // delete selected students
  const deleteStudents = () => {
    const selectedStudentsId = selectedStudents.map((v) => {
      return {
        _id: v.id.split("student-").join(""),
      };
    });
    try {
      selectedStudentsId.forEach(async (v) => {
        await axios.delete(`https://yooda-hostel-12.herokuapp.com/students/${v._id}`);
      });
      alert("Successfully Deleted students");
    } catch (err) {
      alert(err.message);
    } finally {
      setChangeApi((prevState) => !prevState);
      setSelectedStudents([]);
    }
  };

  // update info of selected students
  const updateStudentsInfo = async (updatedData) => {
    try {
      selectedStudents.forEach(async (v) => {
        await axios.put(
          `https://yooda-hostel-12.herokuapp.com/students/${v.id.split("student-").join("")}`,
          updatedData
        );
      });
      alert("Successfully Updated students");
    } catch (err) {
      alert(err.message);
    } finally {
      setChangeApi((prevState) => !prevState);
      handleUnChecked(selectedStudents);
      setSelectedStudents([]);
    }
  };

  return (
    <div className="showStudent">
      <h1 className="text-center display-3 mb-3">All Students</h1>
      <div className="d-flex mb-3 justify-content-between">
        <div>
          <input
            type="number"
            name="limit"
            id="limit"
            placeholder="Enter table size"
            className="form-control"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
        </div>
        <div className="btn-group">
          <button
            className="btn btn-info"
            disabled={selectedStudents.length > 0 ? false : true}
            onClick={() => updateStudentsInfo({ status: "active" })}
          >
            Make Active
          </button>
          <button
            className="btn btn-info"
            disabled={selectedStudents.length > 0 ? false : true}
            onClick={() => updateStudentsInfo({ status: "inActive" })}
          >
            Make inactive
          </button>
          <button
            className="btn btn-danger"
            disabled={selectedStudents.length > 0 ? false : true}
            onClick={deleteStudents}
          >
            Delete?
          </button>
        </div>
      </div>
      {/* show table  */}
      {loading ? (
        <Loading />
      ) : (
        <div className="show-student-table mb-4">
          <table className="table table-striped table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    name="allStudents"
                    onChange={handleToggleSelectAll}
                    checked={
                      selectedStudents.length === Number(limit) ? true : false
                    }
                    className="btn-check"
                    id="btn-check-outlined"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btn-check-outlined"
                  >
                    All
                  </label>
                </th>
                <th scope="col">#</th>
                <th scope="col">Roll</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Class</th>
                <th scope="col">Hall Name</th>
                <th scope="col">Status</th>
                <th scope="col">Edit?</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <TableStudentRow
                  columnItems={{
                    serial: index + 1,
                    roll: student.roll,
                    name: student.fullName,
                    age: student.age,
                    class: student.class,
                    hallName: student.hallName,
                    status: student.status,
                    edit: "Edit",
                  }}
                  student={student}
                  currentPage={currentPage}
                  setChangeApi={setChangeApi}
                  limit={limit}
                  key={student._id}
                  setSelectedStudents={setSelectedStudents}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      <ReactPaginate
        className="pagination justify-content-center"
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShowStudent;
