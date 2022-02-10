import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckAvailabilitySchema from "../Schema/CheckAvailabilitySchema";
import ServeFood from "./ServeFood";
import ShowAlert from "./ShowAlert";

const FoodDistribution = ({ student }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [availability, setAvailability] = useState(false);
  const mealDateWatch = watch("mealDate");
  const shiftWatch = watch("shift");

  useEffect(() => {
    setValue("studentId", student._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue, student]);

  const checkAvailability = async (data) => {
    try {
      const validateData = await CheckAvailabilitySchema.validateAsync(data);
      const res = await axios.get(
        `https://yooda-hostel-12.herokuapp.com/distributes?studentId=${validateData.studentId}&mealDate=${validateData.mealDate}&shift=${validateData.shift}`
      );
      res.data.result.length === 0
        ? setAvailability("show")
        : setAvailability("hide");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mt-5">
      <form
        id="show-info"
        onSubmit={handleSubmit(checkAvailability)}
        className="mb-5"
      >
        <div className="form-group mb-3">
          <label htmlFor="student-name">Name</label>
          <input
            type="text"
            className="form-control"
            id="student-name"
            value={student.fullName || ""}
            readOnly
            {...register("fullName", { required: true })}
          />
        </div>
        <div className="form-group mb-3">
          <select
            className="form-select shift-select"
            {...register("shift", { required: true })}
            defaultValue="Select shift"
            required
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="date">Select date:</label>
          <input
            type="date"
            id="date"
            name="meal-date"
            className="form-control"
            required
            {...register("mealDate", { required: true })}
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-info">
            Check availability
          </button>
          <div
            className={`form-text text-${availability ? "success" : "danger"}`}
          >
            {availability === "show" && (
              <ShowAlert
                boldText="Yes!"
                mainText="Available for serve"
                type="success"
              />
            )}
            {availability === "hide" && (
              <ShowAlert
                boldText="Sorry!"
                mainText="Already served this student"
                type="danger"
              />
            )}
          </div>
        </div>
      </form>
      {availability === "show" && (
        <ServeFood
          student={student}
          mealDateWatch={mealDateWatch}
          shiftWatch={shiftWatch}
          setAvailability={setAvailability}
        />
      )}
    </div>
  );
};

export default FoodDistribution;
