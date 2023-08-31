import { TCalculaSt } from '~/Model/TCalculaSt';
import { TDestinationProduct } from '~/Model/TDestinationProduct';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { reCalcAll } from '../ReCalcAll';

type Props = {
	calculaSt: TCalculaSt;
	event: TDestinationProduct | null;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
	setCalculaSt: (data: TCalculaSt) => void;
};

export function handleDestinationProduct({
	calculaSt,
	event,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
	setCalculaSt,
}: Props) {
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
