import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { acrescimoCalc } from '../AcrescimoCalc';
import { baseCalculoCalc } from '../BaseCalculoCalc';
import { baseIcmsStCalc } from '../BaseIcmsStCalc';
import { difalCalc } from '../DifalCalc';
import { fecpCalc } from '../FecpCalc';
import { icmsCalc } from '../IcmsCalc';
import { icmsPorcentagemCalc } from '../IcmsPorcentagem';
import { intraPorcentagemCalc } from '../IntraPorcentagem';
import { ipiCalc } from '../IpiCalc';
import { mvaPorcentagemCalc } from '../MvaPorcentagemCalc';
import { stCalc } from '../StCalc';
import { valorTotalCalc } from '../ValorTotalCalc';

type Props = {
	calculaSt: TCalculaSt;
	item: TItem;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
};

export function reCalcItem({
	calculaSt,
	item,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	fecpDataBase,
}: Props): TItem {
	const itemEditing = { ...item };
	itemEditing.ipi = ipiCalc({
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		total: itemEditing.total,
		ncm: itemEditing.ncm.code,
		ipiDataBase,
	});

	itemEditing.baseCalculo = baseCalculoCalc({
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		destinoMercadoria: calculaSt.destinoMercadoria?.name || '',
		ipi: itemEditing.ipi,
		total: itemEditing.total,
		ncm: itemEditing.ncm.code,
	});

	itemEditing.icms = icmsCalc({
		baseCalculo: itemEditing.baseCalculo,
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		icmsDataBase,
	});

	itemEditing.baseIcmsSt = baseIcmsStCalc({
		calculaSt,
		total: itemEditing.total,
		ipi: itemEditing.ipi,
		ncm: itemEditing.ncm.code,
		icms: itemEditing.icms,
		icmsDataBase,
		mvaDataBase,
		fecpDataBase,
	});

	itemEditing.st = stCalc({
		calculaSt,
		baseCalculo: itemEditing.baseCalculo,
		baseIcmsSt: itemEditing.baseIcmsSt,
		total: itemEditing.total,
		ipi: itemEditing.ipi,
		icms: itemEditing.icms,
		icmsDataBase,
	});

	itemEditing.difal = difalCalc({
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		total: itemEditing.total,
		ipi: itemEditing.ipi,
		icmsDataBase,
	});

	itemEditing.pis = itemEditing.total * 0.0165;
	itemEditing.cofins = itemEditing.total * 0.076;

	itemEditing.fecp = fecpCalc({
		calculaSt,
		baseIcmsSt: itemEditing.baseIcmsSt,
		fecpDataBase,
	});

	itemEditing.valorTotal = valorTotalCalc({
		calculaSt,
		total: itemEditing.total,
		ipi: itemEditing.ipi,
		st: itemEditing.st,
		fecp: itemEditing.fecp,
	});

	itemEditing.icmsPorcentagem = icmsPorcentagemCalc({
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		icmsDataBase,
	});

	itemEditing.intraPorcentagem = intraPorcentagemCalc({
		estadoDestino: calculaSt.estadoDestino?.initials || '',
		icmsDataBase,
	});

	itemEditing.mvaPorcentagem = mvaPorcentagemCalc({
		calculaSt,
		ncm: itemEditing.ncm.code,
		mvaDataBase,
	});

	itemEditing.acresc = acrescimoCalc({
		st: itemEditing.st,
		total: itemEditing.total,
	});
	return itemEditing;
}
