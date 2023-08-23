import { Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SelectBrazilState } from '~/Components/SelectBrazilState';
import { SelectDestinationProduct } from '~/Components/SelectDestinationProduct';
import { SelectTrueOrFalse } from '~/Components/SelectTrueOrFalse';
import { SelectTypeCalc } from '~/Components/SelectTypeCalc';
import { useBrazilStatesDataBase } from '~/Hooks/UseBrazilStatesDataBase';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TBrazilState } from '~/Model/TBrazilState';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TDestinationProduct } from '~/Model/TDestinationProduct';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { TTypeCalc } from '~/Model/TTypeCalc';
import { reCalcAll } from '~/Utils/ReCalcAll';

type Props = {
	calculaSt: TCalculaSt;
	setCalculaSt: Dispatch<SetStateAction<TCalculaSt>>;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
};

export function HeaderConfiguration({
	calculaSt,
	setCalculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
}: Props) {
	// const { BRAZIL_STATES_DB } = useDataBase();
	const { BRAZIL_STATES_DB } = useBrazilStatesDataBase();
	const { translate } = useTranslation();
	function mustDisabled(dataForVerify: string): boolean {
		if (dataForVerify === 'DestinoMercadoria') {
			if (calculaSt.estadoDestino && calculaSt.estadoDestino.initials === 'SP')
				return true;
		}
		if (dataForVerify === 'TipoCalculo') {
			if (
				(calculaSt.destinoMercadoria?.name === 'Consumo' &&
					!calculaSt.clienteContribuinte) ||
				calculaSt.destinoMercadoria?.name === 'Revenda'
			)
				return true;
		}
		if (dataForVerify === 'ClienteContribuinte') {
			if (calculaSt.destinoMercadoria?.name === 'Revenda') return true;
		}

		if (dataForVerify === 'SimplesNacional') {
			if (calculaSt.destinoMercadoria?.name === 'Consumo') return true;
		}

		if (dataForVerify === 'SimplesNacional') {
			if (
				calculaSt.destinoMercadoria?.name === 'Consumo' ||
				calculaSt.estadoDestino?.initials === 'SP'
			)
				return true;
		}

		return false;
	}

	function handleBrazilStateOrigin(e: TBrazilState | null) {
		const calc = { ...calculaSt };
		calc.estadoOrigem = e;

		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	function handleBrazilStateDestiny(e: TBrazilState | null) {
		const calc = { ...calculaSt };
		calc.estadoDestino = e;

		if (e?.initials === 'SP') {
			calc.destinoMercadoria = { id: '2', name: 'Revenda' };
			calc.clienteContribuinte = true;
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	function handleDestinationProduct(event: TDestinationProduct | null) {
		console.log({ event });
		if (!event) return;
		const calc = { ...calculaSt };
		calc.destinoMercadoria = { ...event };
		if (event.name === 'Consumo') {
			calc.simplesNacional = false;
		}
		if (event.name === 'Revenda') {
			calc.clienteContribuinte = true;
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	function handleTypeCalc(e: TTypeCalc | null) {
		const calc = { ...calculaSt };
		calc.tipoCalculo = e;
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	function handleClienteContribuinte(data: boolean) {
		const calc = { ...calculaSt };
		calc.clienteContribuinte = data;
		if (!data) {
			calc.destinoMercadoria = { id: '1', name: 'Consumo' };
			calc.tipoCalculo = { id: '4', name: 'Não Aplicado' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	function handleSimplesNacional(data: boolean) {
		const calc = { ...calculaSt };
		calc.simplesNacional = data;
		if (!data) {
			calc.destinoMercadoria = { id: '2', name: 'Revenda' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectBrazilState
					states={BRAZIL_STATES_DB || []}
					label={translate('FROM')}
					handleBrazilState={handleBrazilStateOrigin}
					value={calculaSt.estadoOrigem}
					disabled
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectBrazilState
					states={BRAZIL_STATES_DB || []}
					value={calculaSt.estadoDestino}
					label={translate('TO')}
					handleBrazilState={handleBrazilStateDestiny}
					disabled={false}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectDestinationProduct
					handleDestinationProduct={handleDestinationProduct}
					value={calculaSt.destinoMercadoria}
					disabled={mustDisabled('DestinoMercadoria')}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTypeCalc
					handleTypeCalc={handleTypeCalc}
					value={calculaSt.tipoCalculo}
					disabled={mustDisabled('TipoCalculo')}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTrueOrFalse
					disabled={mustDisabled('ClienteContribuinte')}
					value={calculaSt.clienteContribuinte}
					handleTrueOrFalse={handleClienteContribuinte}
					label="Cliente Contribuinte"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
				<SelectTrueOrFalse
					disabled={mustDisabled('SimplesNacional')}
					handleTrueOrFalse={handleSimplesNacional}
					label="Simples Nacional"
					value={calculaSt.simplesNacional}
				/>
			</Grid>
		</Grid>
	);
}
