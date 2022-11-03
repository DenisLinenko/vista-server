import mongoose from 'mongoose';
// import validator from 'validator';
// import bcrypt from 'bcryptjs';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IProductDoc, IProductModel } from './product.interfaces';
import { allBroadcasts, allCurrentStates, allIncidentStatus } from '../../config/product';

const productSchema = new mongoose.Schema<IProductDoc, IProductModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    currentState: {
      type: String,
      enum: allCurrentStates,
      default: 'Investigating',
      required: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    incidentStatus: {
      type: String,
      enum: allIncidentStatus,
      default: 'Operational',
      required: true,
    },
    broadcast: {
      type: String,
      enum: allBroadcasts,
      required: true,
    },
    messageSubject: {
      type: String,
      required: true,
    },
    affectedInfrastructure: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
//  * @returns {Promise<boolean>}
//  */
// productSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// });
//
// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// productSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// });
//
// productSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const Product = mongoose.model<IProductDoc, IProductModel>('Product', productSchema);

export default Product;
