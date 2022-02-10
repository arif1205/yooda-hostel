import Joi from "joi";

const DistributeFoodSchema = Joi.object({
  studentId: Joi.string().required(),
  fullName: Joi.string().required(),
  shift: Joi.string().required(),
  mealDate: Joi.string().required(),
  servedFoods: Joi.array().min(1).required(),
});

export default DistributeFoodSchema;
