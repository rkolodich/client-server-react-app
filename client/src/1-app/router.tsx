import { Outlet, createBrowserRouter } from "react-router-dom"
import { AuthLogin, AuthSignup, Auth } from "@pages/auth"
import { PageNotFoundError } from "@pages/error/index"
import { RootPage } from "@pages/root"
import { NoAuthRequiredProvider } from "@features/auth"

const router = createBrowserRouter([
	{
		path: '/',
		index: false,
		element: (
			<NoAuthRequiredProvider>
				<Outlet />
			</NoAuthRequiredProvider>
		),
		children: [
			{
				element: <Auth />,
				children: [
					{
						path: 'login',
						element: <AuthLogin />
					},
					{
						path: 'signup',
						element: <AuthSignup/>
					},
				]
			},
		]
	},
	{
		path: '/',
		index: true,
		element: (
			<RootPage />
		)
	},
	{
		path: '*',
		element: <PageNotFoundError />,
	}
])

export default router
