import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MainItems } from '~/Components/MainItems';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';

export function Simulation() {
	const { id } = useParams<{ id: string }>();
	const { setCalculaSt } = useCalculaSt();

	useEffect(() => {
		console.log({ id });
		setCalculaSt({
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		});
	}, []);

	return (
		<Grid container sx={{ padding: 2, gap: 4 }}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<HeaderConfiguration />
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<HeaderInformation />
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<MainItems />
			</Grid>
		</Grid>
	);
}
