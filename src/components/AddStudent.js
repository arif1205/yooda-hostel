import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import StudentSchema from "../Schema/StudentSchema";

const AddStudent = ({ setChangeApi }) => {
  const { register, handleSubmit, reset } = useForm();

  // submit form
  const onSubmit = async (data) => {
    try {
      // change to number
      const studentData = { ...data, age: Number(data.age), class: Number(data.class), roll: Number(data.roll) };
      // validate the data
      const studentValidateData = await StudentSchema.validateAsync(studentData);
      // insert data to database
      await axios.post("https://yooda-hostel-12.herokuapp.com/students", studentValidateData);
      alert("Successfully added a new student");
    } catch (err) {
      alert(err.message);
    } finally {
      setChangeApi((prevState) => !prevState);
      reset();
    }
  };

  return (
    <div className="add-food">
      <h1 className="text-center display-4">Add New Student</h1>
      {/* Add new food form  */}
      <form id="addStudent" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="student-name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="student-name"
            placeholder="Enter full name"
            id="student-name"
            required
            {...register("fullName", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="student-roll" className="form-label">
            Roll
          </label>
          <input
            type="text"
            className="form-control"
            id="student-roll"
            placeholder="Enter roll (starts from 1)"
            required
            {...register("roll", { required: true, min: 1 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="student-age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="student-age"
            placeholder="Enter age (min 6)"
            required
            {...register("age", { required: true, min: 6 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="student-class" className="form-label">
            Class
          </label>
          <input
            type="text"
            className="form-control"
            id="student-class"
            placeholder="Enter class (Ex. 1)"
            required
            {...register("class", { required: true, min: 6 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="student-hallName" className="form-label">
            Hall Name
          </label>
          <input
            type="text"
            className="form-control"
            id="student-hallName"
            placeholder="Enter hall name"
            required
            {...register("hallName", { required: true, min: 6 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="student-status" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="student-status"
            placeholder="Enter status(active or inActive)"
            required
            {...register("status", { required: true, min: 6 })}
          />
          <div className="form-text">Please enter "active" or "inActive"</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
