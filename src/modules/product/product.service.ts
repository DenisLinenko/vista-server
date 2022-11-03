import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Product from './product.model';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCreatedProduct, IProductDoc, UpdateProductBody } from './product.interfaces';
import ApiError from '../errors/ApiError';

/**
 * Create a product
 * @param {NewCreatedProduct} productBody
 * @returns {Promise<IProductDoc>}
 */
// eslint-disable-next-line import/prefer-default-export
export const createProduct = async (productBody: NewCreatedProduct): Promise<IProductDoc> => {
  return Product.create(productBody);
};
//
// /**
//  * Register a user
//  * @param {NewRegisteredUser} userBody
//  * @returns {Promise<IUserDoc>}
//  */
// export const registerUser = async (userBody: NewRegisteredUser): Promise<IUserDoc> => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   return User.create(userBody);
// };
//
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryProducts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getProductById = async (id: mongoose.Types.ObjectId): Promise<IProductDoc | null> => Product.findById(id);

// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<IUserDoc | null>}
//  */
// export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });
//
/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateProductBody} updateBody
 * @returns {Promise<IProductDoc | null>}
 */
export const updateProductById = async (
  productId: mongoose.Types.ObjectId,
  updateBody: UpdateProductBody
): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {mongoose.Types.ObjectId} productId
 * @returns {Promise<IProductDoc | null>}
 */
export const deleteProductById = async (productId: mongoose.Types.ObjectId): Promise<IProductDoc | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};
