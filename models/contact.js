const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactChema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const patchJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const updateJoiSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
const Contact = model('contact', contactChema);

module.exports = {
  Contact, joiSchema, patchJoiSchema, updateJoiSchema
}