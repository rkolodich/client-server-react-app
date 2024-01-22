import { HydratedDocument, Model, Schema, model } from "mongoose"
import { USER_MODEL_NAME } from "./UserModel.js"
import { POST_MODEL_NAME } from "./PostModel.js"

export const OAUTH_MODEL_NAME = 'posts'

const PostLikeModel: Schema = new Schema<IPostLike, PostLikeModel>({
	post: { type: String, required: true, ref: POST_MODEL_NAME },
	user: { type: String, required: true, ref: USER_MODEL_NAME },
}, { collection: OAUTH_MODEL_NAME })

export default model<IPostLike, PostLikeModel>(OAUTH_MODEL_NAME, PostLikeModel)

export interface IPostLike {
	post: typeof Schema.Types.ObjectId
	user: typeof Schema.Types.ObjectId,
	created: Date,
}

export interface PostLikeModel extends Model<PostLikeDocument> {}

export interface PostLikeDocument extends HydratedDocument<IPostLike> {}
