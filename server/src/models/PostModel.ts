import { HydratedDocument, Model, Schema, model } from "mongoose"
import { USER_MODEL_NAME } from "./UserModel.js"

export const POST_MODEL_NAME = 'post'

const PostModel: Schema = new Schema<IPost, PostModel>({
	text: { type: String, required: true },
	user: { type: String, required: true, ref: USER_MODEL_NAME },
	created: { type: Date, required: true },
	likes: { type: Number, required: true }
})

export default model<IPost, PostModel>(POST_MODEL_NAME, PostModel)

export interface IPost {
	text: string
	user: typeof Schema.Types.ObjectId,
	created: Date,
	likes: number
}

export interface PostModel extends Model<PostDocument> {}

export interface PostDocument extends HydratedDocument<IPost> {}
