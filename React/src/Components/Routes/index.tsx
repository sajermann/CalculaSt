import { Route, Routes } from 'react-router-dom';
import { Home } from '~/Pages/Home';
import { Simulation } from '~/Pages/Simulation';
import { Simulations } from '~/Pages/Simulations';

export function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/simulation/" element={<Simulation />} />
			<Route path="/simulation/:id" element={<Simulation />} />
			<Route path="/simulations" element={<Simulations />} />
		</Routes>
	);
}
