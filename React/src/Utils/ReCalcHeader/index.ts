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
	for (let i = 0; i < calculaStForRecalc.itens.length; i += 1) {
		baseCalculo += calculaStForRecalc.itens[i].baseCalculo;
		icmsHere += calculaStForRecalc.itens[i].icms;
		baseIcmsSt += calculaStForRecalc.itens[i].baseIcmsSt;
		st += calculaStForRecalc.itens[i].st;
		total += calculaStForRecalc.itens[i].total;
		pis += calculaStForRecalc.itens[i].pis;
		cofins += calculaStForRecalc.itens[i].cofins;
		ipi += calculaStForRecalc.itens[i].ipi;
		valorTotal += calculaStForRecalc.itens[i].valorTotal;
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
