import Joi from "joi";

const CheckAvailabilitySchema = Joi.object({
  studentId: Joi.string().required(),
  fullName: Joi.string().required(),
  shift: Joi.string().required(),
  mealDate: Joi.string().required(),
});

export default CheckAvailabilitySchema;
