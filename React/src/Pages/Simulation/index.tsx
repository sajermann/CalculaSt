import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MainItems } from '~/Components/MainItems';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useSimulations } from '~/Hooks/UseSimulations';
import { useToast } from '~/Hooks/UseToast';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Simulation() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { setMessage, setIsOpen, setSeverity } = useToast();
	const { translate } = useTranslation();
	const { setCalculaSt } = useCalculaSt();
	const { getSimulation } = useSimulations();

	useEffect(() => {
		if (!id) {
			setCalculaSt({
				estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
			});
			return;
		}
		const result = getSimulation(id);
		console.log({ id, result });
		if (result) {
			setCalculaSt({ ...result });
			return;
		}
		setMessage(translate('SIMULATION_NOT_FOUND'));
		setSeverity('error');
		setIsOpen(true);
		navigate('/simulations');
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
