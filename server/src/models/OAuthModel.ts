import { authServer } from "#/enums/authServer.js"
import { HydratedDocument, Model, Schema, model } from "mongoose"
import { USER_MODEL_NAME } from "./UserModel.js"

export const OAUTH_MODEL_NAME = 'oauth'

const OAuthModel: Schema = new Schema<IOAuth, OAuthModel>({
	authServer: { type: String, required: true },
	user: { type: String, required: true, ref: USER_MODEL_NAME },
	sub: { type: String, required: true }
}, { collection: OAUTH_MODEL_NAME })

export default model<IOAuth, OAuthModel>(OAUTH_MODEL_NAME, OAuthModel)

export interface IOAuth {
	authServer: authServer
	user: typeof Schema.Types.ObjectId
	sub: string
}

export interface OAuthModel extends Model<OAuthDocument> {}

export interface OAuthDocument extends HydratedDocument<IOAuth> {}
