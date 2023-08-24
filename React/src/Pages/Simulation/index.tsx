import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MainItems } from '~/Components/MainItems';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useObsDataBase } from '~/Hooks/UseObsDataBase';
import { TItem } from '~/Model/TItem';
import { handleCreateItem } from '~/Utils/HandleCreateItem';
import { handleUpdateItem } from '~/Utils/HandleUpdateItem';

export function Simulation() {
	const { calculaSt, setCalculaSt } = useCalculaSt();
	const { obsDataBase } = useObsDataBase();

	useEffect(() => {
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
				<MainItems
					handleEditItem={(item: TItem, mode: 'edit' | 'delete') =>
						handleUpdateItem({
							item,
							calculaSt,
							setCalculaSt,
							mode,
							obsDataBase,
						})
					}
					handleCreateItem={item =>
						handleCreateItem({
							calculaSt,
							setCalculaSt,
							item,
							obsDataBase,
						})
					}
				/>
			</Grid>
		</Grid>
	);
}
