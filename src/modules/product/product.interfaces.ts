import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IProduct {
  userId: string;
  title: string;
  currentState: string;
  details: string;
  incidentStatus: string;
  broadcast: string;
  messageSubject: string;
  affectedInfrastructure: boolean;
  deleted: boolean;
}

export interface IProductDoc extends IProduct, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IProductModel extends Model<IProductDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateProductBody = Partial<IProduct>;

export type NewCreatedProduct = Omit<IProduct, 'isEmailVerified'>;

export interface IUserWithTokens {
  user: IProductDoc;
  tokens: AccessAndRefreshTokens;
}
