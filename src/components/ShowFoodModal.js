import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FoodSchema from "../Schema/FoodSchema";
import { ModalWrapper } from "./ShowModal.styles";

const ShowFoodModal = ({ food, openModal, setOpenModal, setChangeApi }) => {
  const { register, handleSubmit, setValue } = useForm();

  // set current values
  useEffect(() => {
    setValue("foodName", food.foodName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("foodPrice", food.foodPrice, {
      shouldValidate: true,
      shouldDirty: true,
    });
    
  }, [food, setValue]);

  // submit form
  const onSubmit = async (data) => {
    try {
      // change foodPrice to number
      const foodData = {
        ...data,
        foodPrice: Number(data.foodPrice),
      };
      // validate the data
      const foodValidateData = await FoodSchema.validateAsync(
        foodData
      );
      // insert data to database
      await axios.put(
        `https://yooda-hostel-12.herokuapp.com/food/${food._id}`,
        foodValidateData
      );
      setChangeApi((prevState) => !prevState);
      alert("Successfully updated food info");
    } catch (err) {
      alert(err.message);
    } finally {
      setOpenModal(false);
      setChangeApi((prevState) => !prevState);
    }
  };

  return (
    <ModalWrapper openModal={openModal}>
      <div className="show-modal-container">
        <form id={food._id} onSubmit={handleSubmit(onSubmit)}>
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

export default ShowFoodModal;
