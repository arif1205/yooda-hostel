import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StudentSchema from '../Schema/StudentSchema';
import { ModalWrapper } from './ShowModal.styles';

const ShowStudentModal = ({
  student,
  openModal,
  setOpenModal,
  setChangeApi,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  // set current values
  useEffect(() => {
    setValue("fullName", student.fullName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("age", student.age, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("roll", student.roll, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("class", student.class, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("hallName", student.hallName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("status", student.status, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [student, setValue]);

  // submit form
  const onSubmit = async (data) => {
    try {
      // change foodPrice to number
      const studentData = {
        ...data,
        age: Number(data.age),
        class: Number(data.class),
        roll: Number(data.roll),
      };
      // validate the data
      const studentValidateData = await StudentSchema.validateAsync(
        studentData
      );
      // insert data to database
      await axios.put(
        `http://localhost:4000/students/${student._id}`,
        studentValidateData
      );
      setChangeApi((prevState) => !prevState);
      alert("Successfully updated student info");
    } catch (err) {
      alert(err.message);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <ModalWrapper openModal={openModal}>
      <div className="show-modal-container">
        <form id={student._id} onSubmit={handleSubmit(onSubmit)}>
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
            className="btn btn-primary me-3"
            onClick={handleSubmit(onSubmit)}
          >
            Apply Changes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default ShowStudentModal;