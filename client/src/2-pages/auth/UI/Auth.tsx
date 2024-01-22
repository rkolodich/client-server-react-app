import { Outlet } from "react-router-dom";

export default function Auth() {
	return (
		<div className="flex">
			{/* <div>
				Auth
			</div> */}
			<Outlet />
		</div>
	)
}
