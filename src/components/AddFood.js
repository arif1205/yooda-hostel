import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import FoodSchema from "../Schema/FoodSchema";

const AddFood = ({setChangeApi}) => {
  const { register, handleSubmit } = useForm();

  // submit form
  const onSubmit = async (data) => {
    try {
      // change foodPrice to number
      const foodData = { ...data, foodPrice: Number(data.foodPrice) };
      // validate the data
      const foodValidateData = await FoodSchema.validateAsync(foodData);
      // insert data to database
      await axios.post(
        "http://localhost:4000/food",
        foodValidateData
      );
      alert('Successfully added food');
    } catch (err) {
      alert(err.message);
    } finally {
      setChangeApi((prevState) => !prevState);
    }
  };

  return (
    <div className="add-food">
      <h1 className="text-center display-4">Add a Food</h1>
      {/* Add new food form  */}
      <form
        id="addFood"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="food-name" className="form-label">
            Food Name
          </label>
          <input
            type="text"
            className="form-control"
            name="food-name"
            placeholder="Enter food name"
            id="food-name"
            required
            {...register("foodName", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="food-price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="food-price"
            placeholder="Enter price"
            required
            {...register("foodPrice", { required: true, min: 0 })}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Add food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
