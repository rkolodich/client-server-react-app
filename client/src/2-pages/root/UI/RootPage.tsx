import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@widgets/header";

export default function RootPage() {
	const location = useLocation()

	useEffect(() => {
		console.log(location)
	}, [])

	return (
		<>
			<Header />
		</>
	)
}
