import { UserDocument } from "#/models/UserModel.js";
import { Types } from "mongoose";

class UserDto {
	id: UserDocument['_id']
	email: UserDocument['email']
	isActivated: UserDocument['isActivated']
	name: UserDocument['name']
	secondName: UserDocument['secondName']

	constructor(document: UserDocument) {
		this.id = document._id
		this.email = document.email
		this.isActivated = document.isActivated
		this.name = document.name
		this.secondName = document.secondName
	}
}

export default UserDto
