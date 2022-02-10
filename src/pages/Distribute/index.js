import axios from "axios";
import React, { useState } from "react";
import FoodDistribution from "../../components/FoodDistribution";
import Loading from "../../components/Loading";

const Distribute = () => {
  const [roll, setRoll] = useState(0);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search student
  const searchStudent = (e) => {
    e.preventDefault();
    const getStudent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://yooda-hostel-12.herokuapp.com/students?_roll=${roll}`
        );
        setStudent(res.data.result);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
        setRoll(0);
      }
    };
    getStudent();
  };

  return (
    <div className="container">
      <h1 className="title display-3">Search Student By Roll</h1>
      <div className="search-student">
        <form id="search-student" onSubmit={searchStudent}>
          <div className="form-group">
            <label htmlFor="student-roll">Roll</label>
            <input
              type="text"
              className="form-control mb-3"
              id="student-roll"
              placeholder="Enter Roll"
              value={roll || ""}
              onChange={(e) => {
                setRoll(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={searchStudent}
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="search-result">
          {student.length === 0 ? (
            <h1 className="mt-5">No Result Found</h1>
          ) : (
            <FoodDistribution student={student[0]} />
          )}
        </div>
      )}
    </div>
  );
};

export default Distribute;
