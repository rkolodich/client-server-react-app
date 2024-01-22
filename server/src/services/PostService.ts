import { ApiError } from "#/errors/ApiError.js"
import PostLikeModel from "#/models/PostLikeModel.js"
import PostModel, { IPost } from "#/models/PostModel.js"
import UserModel from "#/models/UserModel.js"
import { getISODate } from "#/utils/Date/index.js"
import { Types } from 'mongoose'

class PostService {
	async getList() {
		try {
			let posts = await PostModel.find()
			return posts
		}
		catch (e) {
			throw ApiError.SomethingWentWrongError()
		}
	}

	async find() {

	}

	async create(text: IPost['text'], user: Types.ObjectId) {
		try {
			const post = await PostModel.create({
				user,
				text,
				created: getISODate()
			})

			return post
		}
		catch (e) {
			throw ApiError.SomethingWentWrongError()
		}
	}

	async edit(text: IPost['text'], post: Types.ObjectId) {
		try {
			const _post = await PostModel.findById(post)

			if (!_post) {
				throw ApiError.BadRequestError('Post was not found')
			}

			_post.text = text
			await _post.save()
		}
		catch (e) {
			throw e
		}
	}

	async remove(post: Types.ObjectId) {
		try {
			const exists = await PostModel.exists({ _id: post })
			if (!exists) {
				throw ApiError.SomethingWentWrongError()
			}

			await Promise.all([
				PostLikeModel.deleteMany({ post }),
				PostModel.deleteOne({ _id: post })
			])
		}
		catch (e) {
			throw e
		}
	}

	async like(post: Types.ObjectId, user: Types.ObjectId) {
		try {
			const _post = await PostModel.findById(post)
			if (!_post) {
				throw ApiError.BadRequestError('Post was not found')
			}

			const userExists = await UserModel.exists(post)
			if (!userExists) {
				throw ApiError.BadRequestError('User was not found')
			}

			// TODO проверка, если пользователь уже поставил лайк

			++_post.likes
			Promise.all([
				PostLikeModel.create({ user, post }),
				_post.save()
			])
		}
		catch (e) {
			throw e
		}
	}

	async unlike(post: Types.ObjectId, user: Types.ObjectId) {
		try {
			const exists = await PostLikeModel.exists({ user, post })
			if (!exists) {
				throw ApiError.SomethingWentWrongError()
			}

			const _post = await PostModel.findById(post)
			if (!_post) {
				throw ApiError.BadRequestError('Post was not found')
			}

			--_post.likes
			await Promise.all([
				_post.save(),
				PostLikeModel.deleteOne({ user, post })
			])
		}
		catch (e) {
			throw e
		}
	}

	async getLikes(posts: Types.ObjectId | Types.ObjectId[]) {
		const likes = await PostLikeModel.find({ _id: posts })
		return likes
	}
}

export default new PostService()
