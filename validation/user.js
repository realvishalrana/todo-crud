import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
});

export { createUserSchema, updateUserSchema, loginUserSchema };
