import { Route, Routes } from 'react-router-dom';
import Create from '~/Pages/Create';
import Home from '~/Pages/Home';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create-simulation" element={<Create />} />
		</Routes>
	);
}
