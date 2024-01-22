import { Link } from 'react-router-dom'
import { getAccessToken, useAuthProcess } from '@features/auth'
import HeaderAuthButtons from './HeaderAuthButtons'
import HeaderAvatar from './HeaderAvatar'


export default function Header() {
	const { isLoggedIn, isLoggingIn, isChecking } = useAuthProcess()

	return (
		<header className="bg-gray-100">
			<div className="container mx-auto">
				<div className="flex items-center justify-between py-3">
					<Link to='/'>
						My site
					</Link>

					{/* <nav className='mx-auto'>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
						</ul>
					</nav> */}

					<div className='self-end flex align-middle'>
						{
							isLoggedIn() || isChecking() || getAccessToken()
							?
							<HeaderAvatar />
							:
							isLoggingIn()
							?
							<HeaderAvatar isLoggingIn />
							:
							<HeaderAuthButtons />
						}
					</div>
				</div>
			</div>
		</header>
	)
}
