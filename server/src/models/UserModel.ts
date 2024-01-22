import { HydratedDocument, Model, Schema, model } from "mongoose"

export const USER_MODEL_NAME = 'user'

const UserModel: Schema = new Schema<IUser, UserModel>({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	secondName: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	avatar: { type: String },
})

export default model<IUser, UserModel>(USER_MODEL_NAME, UserModel)

export interface IUser {
	email: string
	password: string
	name: string
	secondName: string
	isActivated: boolean
	avatar: string
}

export interface UserModel extends Model<UserDocument> {}

export interface UserDocument extends HydratedDocument<IUser> {}
