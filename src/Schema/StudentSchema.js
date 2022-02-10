import Joi from "joi";

const StudentSchema = Joi.object({
  fullName: Joi.string().required(),
  roll: Joi.number().min(1).required(),
  age: Joi.number().min(6).required(),
  class: Joi.number().min(1).required(),
  hallName: Joi.string().required(),
  status: Joi.string().valid("active", "inActive").required(),
});

export default StudentSchema;
