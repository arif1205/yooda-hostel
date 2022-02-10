import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DistributeFoodSchema from "../Schema/DistributeFoodSchema";

const ServeFood = ({ student, mealDateWatch, shiftWatch, setAvailability }) => {
  const [foods, setFoods] = useState([]);
  const [servedFoods, setServedFoods] = useState([]);
  const { handleSubmit } = useForm();

  useEffect(() => {
    const getFoods = async () => {
      const res = await axios.get(`https://yooda-hostel-12.herokuapp.com/food`);
      setFoods(res.data.result);
    };
    getFoods();
  }, []);

  const onSelectFood = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServedFoods((prevServedFoods) => [...prevServedFoods, value]);
    } else {
      setServedFoods((prevServedFoods) =>
        prevServedFoods.filter((food) => food !== value)
      );
    }
  };

  const makeServeFood = async () => {
    if (servedFoods.length === 0) {
      alert("Please select at least one food");
      return;
    }

    const passedData = {
      fullName: student.fullName,
      mealDate: mealDateWatch,
      shift: shiftWatch,
      studentId: student._id,
      servedFoods: [...servedFoods],
    };
    const validateData = await DistributeFoodSchema.validateAsync(passedData);
    // post to the distributes collection
    try {
      await axios.post(`https://yooda-hostel-12.herokuapp.com/distributes`, validateData);
      alert("Food distributed successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setAvailability(false);
    }
  };

  return (
    <div className="serve-food">
      <h1 className="h1 mb-3">Serve Food</h1>
      <div className="food-list-container ">
        <form id="food-list" onSubmit={handleSubmit(makeServeFood)}>
          <div
            className="d-flex p-5 bg-light rounded-3"
            style={{ gap: "10px", flexWrap: "wrap" }}
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            {foods.map((food) => (
              <div key={food._id}>
                <input
                  type="checkbox"
                  className="btn-check"
                  id={`food-${food._id}`}
                  autoComplete="off"
                  name={`food-list-for-serve`}
                  value={food.foodName}
                  onChange={onSelectFood}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor={`food-${food._id}`}
                >
                  {food.foodName}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            onClick={handleSubmit(makeServeFood)}
            className="btn btn-warning mt-3 mb-5"
          >
            Serve Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServeFood;
