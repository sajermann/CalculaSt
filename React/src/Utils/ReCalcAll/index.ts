import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TObs } from '~/Model/TObs';
import { obsCalc } from '../ObsCalc';
import { reCalcHeader } from '../ReCalcHeader';
import { reCalcItem } from '../ReCalcItem';

type Props = {
	calculaStForRecalcAll: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
	obsDataBase: TObs[];
	setCalculaSt: (data: TCalculaSt) => void;
};

export function reCalcAll({
	calculaStForRecalcAll,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
	obsDataBase,
	setCalculaSt,
}: Props) {
	const calculaStForRecalcAllNew = { ...calculaStForRecalcAll };
	const itemsRecalculed: TItem[] = [];
	for (const item of calculaStForRecalcAll.itens) {
		const itemTemp = { ...item };
		const result = reCalcItem({
			calculaSt: calculaStForRecalcAll,
			item: itemTemp,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			fecpDataBase,
		});
		itemsRecalculed.push(result);
	}

	calculaStForRecalcAllNew.itens = [...itemsRecalculed];
	calculaStForRecalcAllNew.obs = obsCalc({
		calculaSt: calculaStForRecalcAllNew,
		obsDataBase,
	});
	reCalcHeader({ calculaStForRecalc: calculaStForRecalcAllNew, setCalculaSt });
}
