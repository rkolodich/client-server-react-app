import { HydratedDocument, Model, Schema, model } from "mongoose"
import { USER_MODEL_NAME } from "./UserModel.js"

export const USER_ACTIVATION_MODEL_NAME = 'user_activation'

const UserActivationModel: Schema = new Schema<IUserActivation, UserModel>({
	user: { type: Schema.Types.ObjectId, required: true, ref: USER_MODEL_NAME },
	activationLink: { type: String, required: true },
	expires: { type: Schema.Types.Date, required: true },
})

export default model<IUserActivation, UserModel>(USER_ACTIVATION_MODEL_NAME, UserActivationModel)

export interface IUserActivation {
	user: typeof Schema.Types.ObjectId
	activationLink: string,
	expires: Date
}

export interface UserModel extends Model<UserActivationDocument> {}

export interface UserActivationDocument extends HydratedDocument<IUserActivation> {}
