import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { TTypeCalc } from '~/Model/TTypeCalc';
import { reCalcAll } from '../ReCalcAll';

type Props = {
	calculaSt: TCalculaSt;
	event: TTypeCalc | null;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
	setCalculaSt: (data: TCalculaSt) => void;
};

export function handleTypeCalc({
	calculaSt,
	event,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
	setCalculaSt,
}: Props) {
	const calc: TCalculaSt = { ...calculaSt, tipoCalculo: event };

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
