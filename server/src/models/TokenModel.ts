import { HydratedDocument, Model, Schema, model } from "mongoose"
import { USER_MODEL_NAME } from "./UserModel.js"

export const TOKEN_MODEL_NAME = 'token'

const TokenModel: Schema = new Schema<IToken, TokenModel>({
	user: { type: Schema.Types.ObjectId, ref: USER_MODEL_NAME },
	refreshToken: { type: String, required: true }
})


export default model<IToken, TokenModel>(TOKEN_MODEL_NAME, TokenModel)

export interface IToken {
	user: typeof Schema.Types.ObjectId
	refreshToken: string
}

export interface TokenModel extends Model<TokenDocument> {}

export interface TokenDocument extends HydratedDocument<IToken> {}
