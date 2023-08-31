import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { reCalcAll } from '../ReCalcAll';

type Props = {
	calculaSt: TCalculaSt;
	event: boolean;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
	setCalculaSt: (data: TCalculaSt) => void;
};

export function handleSimplesNacional({
	calculaSt,
	event,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
	setCalculaSt,
}: Props) {
	const calc: TCalculaSt = { ...calculaSt, simplesNacional: event };
	calc.simplesNacional = event;
	if (!event) {
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
