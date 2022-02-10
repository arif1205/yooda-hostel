import Joi from 'joi';

const FoodSchema = Joi.object({
  foodName: Joi.string().required(),
  foodPrice: Joi.number().required(),
})

export default FoodSchema;