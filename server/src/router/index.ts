import OAuthController from "#/controllers/OAuthController.js";
import UserController from "#/controllers/UserController.js";
import authMiddleware from "#/middlewares/authMiddleware.js";
import Logger from "#/utils/Logger/Logger.js";
import { Router } from "express";
import { body } from "express-validator";

const router = Router()

const userController = new UserController()
const oAuthController = new OAuthController()

router.post('/signup',

	/**
	 * TODO вынести валидаторы в отдельную папку
	 * @link https://stackoverflow.com/questions/12548624/validate-a-password-with-express-validator
	 * */
	body('email').isEmail(),
	body('name').isString(),
	body('secondName').isString(),
	body('password').isLength({ min: 6, max: 32 }),
	userController.signup
)
router.post('/login',
	body('email').isEmail(),
	body('password').isString(),
	userController.login
)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users',
	authMiddleware,
	userController.getUsers
)
router.get('/auth/google',
	oAuthController.googleAuthUrl
)
router.get('/auth/google/callback',
	oAuthController.googleAuthCallbackUrl
)

export default router
