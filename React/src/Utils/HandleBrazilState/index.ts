import { TBrazilState } from '~/Model/TBrazilState';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { reCalcAll } from '../ReCalcAll';

type Props = {
	calculaSt: TCalculaSt;
	event: TBrazilState | null;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
	setCalculaSt: (data: TCalculaSt) => void;
};

export function handleBrazilState({
	calculaSt,
	event,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
	setCalculaSt,
}: Props) {
	const calc: TCalculaSt = { ...calculaSt, estadoDestino: event };

	if (event?.initials === 'SP') {
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
