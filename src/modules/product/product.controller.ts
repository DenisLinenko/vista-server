import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as productService from './product.service';
import _ from 'lodash';

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['title']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params['productId']));
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
  }
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  if (_.isEmpty(req.params['productId'])) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong. There is no productId');
  }
  if (typeof req.params['productId'] === 'string') {
    const product = await productService.updateProductById(new mongoose.Types.ObjectId(req.params['productId']), req.body);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
  }
});
//
// export const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   if (typeof req.params['userId'] === 'string') {
//     await productService.deleteUserById(new mongoose.Types.ObjectId(req.params['userId']));
//     res.status(httpStatus.NO_CONTENT).send();
//   }
// });
