import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


export default function HeaderAuthButtons() {
	return (
		<>
			<Button as={Link} className='me-2' size='sm' to='/signup'>
				Sign up
			</Button>
			<Button as={Link} outline size='sm' to='/login'>
				Log in
			</Button>
		</>
	)
}
