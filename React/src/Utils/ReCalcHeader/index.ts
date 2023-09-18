import { TCalculaSt } from '~/Model/TCalculaSt';

type Props = {
	calculaStForRecalc: TCalculaSt;
	setCalculaSt: (data: TCalculaSt) => void;
};
export function reCalcHeader({ calculaStForRecalc, setCalculaSt }: Props) {
	const newCalculoSt = { ...calculaStForRecalc };
	let baseCalculo = 0;
	let icmsHere = 0;
	let baseIcmsSt = 0;
	let st = 0;
	let total = 0;
	let pis = 0;
	let cofins = 0;
	let ipi = 0;
	let valorTotal = 0;
	for (const item of calculaStForRecalc.itens) {
		baseCalculo += item.baseCalculo;
		icmsHere += item.icms;
		baseIcmsSt += item.baseIcmsSt;
		st += item.st;
		total += item.total;
		pis += item.pis;
		cofins += item.cofins;
		ipi += item.ipi;
		valorTotal += item.valorTotal;
	}

	newCalculoSt.baseDeCalculo = baseCalculo;
	newCalculoSt.icms = icmsHere;
	newCalculoSt.baseIcmsSt = baseIcmsSt;
	newCalculoSt.st = st;
	newCalculoSt.total = total;
	newCalculoSt.pis = pis;
	newCalculoSt.cofins = cofins;
	newCalculoSt.ipi = ipi;
	newCalculoSt.totalGeral = valorTotal;
	setCalculaSt(newCalculoSt);
	return true;
}
