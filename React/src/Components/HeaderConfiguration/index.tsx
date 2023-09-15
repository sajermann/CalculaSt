import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SelectBrazilState } from '~/Components/SelectBrazilState';
import { SelectDestinationProduct } from '~/Components/SelectDestinationProduct';
import { SelectTrueOrFalse } from '~/Components/SelectTrueOrFalse';
import { SelectTypeCalc } from '~/Components/SelectTypeCalc';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useTranslation } from '~/Hooks/UseTranslation';
import { handleBrazilState } from '~/Utils/HandleBrazilState';
import { handleClienteContribuinte } from '~/Utils/HandleClienteContribuinte';
import { handleDestinationProduct } from '~/Utils/HandleDestinationProduct';
import { handleSimplesNacional } from '~/Utils/HandleSimplesNacional';
import { handleTypeCalc } from '~/Utils/HandleTypeCalc';
import { mustDisabled } from '~/Utils/MustDisabled';
import { useDataBase } from '~/Hooks/UseDataBase';
import { DeleteSimulation } from '../DeleteSimulation';
import { SaveSimulation } from '../SaveSimulation';

export function HeaderConfiguration() {
	const { calculaSt, setCalculaSt } = useCalculaSt();
	const {
		brazilStatesDataBase,
		fecpDataBase,
		icmsDataBase,
		ipiDataBase,
		mvaDataBase,
		obsDataBase,
	} = useDataBase();

	const { translate } = useTranslation();

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12} display="flex">
				<div className="flex-1">
					<Typography variant="h6">{calculaSt.title}</Typography>
				</div>
				<div className="flex gap-4">
					<Link to="/simulations">
						<Button>{translate('BACK')}</Button>
					</Link>
					<DeleteSimulation />
					<SaveSimulation />
				</div>
			</Grid>
			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectBrazilState
					states={brazilStatesDataBase}
					label="De"
					value={calculaSt.estadoOrigem}
					disabled
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectBrazilState
					states={brazilStatesDataBase}
					value={calculaSt.estadoDestino}
					label="Para"
					handleBrazilState={event =>
						handleBrazilState({
							calculaSt,
							event,
							fecpDataBase,
							icmsDataBase,
							ipiDataBase,
							mvaDataBase,
							obsDataBase,
							setCalculaSt,
						})
					}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectDestinationProduct
					handleDestinationProduct={event =>
						handleDestinationProduct({
							calculaSt,
							event,
							fecpDataBase,
							icmsDataBase,
							ipiDataBase,
							mvaDataBase,
							obsDataBase,
							setCalculaSt,
						})
					}
					value={calculaSt.destinoMercadoria}
					disabled={mustDisabled({
						calculaSt,
						dataForVerify: 'destinoMercadoria',
					})}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTypeCalc
					handleTypeCalc={event =>
						handleTypeCalc({
							calculaSt,
							event,
							fecpDataBase,
							icmsDataBase,
							ipiDataBase,
							mvaDataBase,
							obsDataBase,
							setCalculaSt,
						})
					}
					value={calculaSt.tipoCalculo}
					disabled={mustDisabled({
						calculaSt,
						dataForVerify: 'tipoCalculo',
					})}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTrueOrFalse
					disabled={mustDisabled({
						calculaSt,
						dataForVerify: 'clienteContribuinte',
					})}
					value={calculaSt.clienteContribuinte}
					handleTrueOrFalse={event =>
						handleClienteContribuinte({
							calculaSt,
							event,
							fecpDataBase,
							icmsDataBase,
							ipiDataBase,
							mvaDataBase,
							obsDataBase,
							setCalculaSt,
						})
					}
					label="Cliente Contribuinte"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTrueOrFalse
					disabled={mustDisabled({
						calculaSt,
						dataForVerify: 'simplesNacional',
					})}
					handleTrueOrFalse={event =>
						handleSimplesNacional({
							calculaSt,
							event,
							fecpDataBase,
							icmsDataBase,
							ipiDataBase,
							mvaDataBase,
							obsDataBase,
							setCalculaSt,
						})
					}
					label="Simples Nacional"
					value={calculaSt.simplesNacional}
				/>
			</Grid>
		</Grid>
	);
}
