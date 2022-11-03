import Joi from 'joi';
import { NewCreatedProduct } from './product.interfaces';
import { objectId } from '../validate/custom.validation';

const createProductBody: Record<keyof NewCreatedProduct, any> = {
  userId: Joi.string().required(),
  title: Joi.string().required(),
  currentState: Joi.string().required(),
  details: Joi.string().required(),
  incidentStatus: Joi.string().required(),
  broadcast: Joi.string().required(),
  messageSubject: Joi.string().required(),
  affectedInfrastructure: Joi.boolean(),
  deleted: Joi.boolean(),
};

// eslint-disable-next-line import/prefer-default-export
export const createProduct = {
  body: Joi.object().keys(createProductBody),
};

export const getProducts = {
  query: Joi.object().keys({
    userId: Joi.string(),
    title: Joi.string(),
    currentState: Joi.string(),
    details: Joi.string(),
    incidentStatus: Joi.string(),
    broadcast: Joi.string(),
    messageSubject: Joi.string(),
    affectedInfrastructure: Joi.boolean(),
    deleted: Joi.boolean(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string(),
      title: Joi.string(),
      currentState: Joi.string(),
      details: Joi.string(),
      incidentStatus: Joi.string(),
      broadcast: Joi.string(),
      messageSubject: Joi.string(),
      affectedInfrastructure: Joi.boolean(),
      deleted: Joi.boolean(),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
