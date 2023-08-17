import { TNcm } from './TNcm';

export type TItem = {
	id: string;
	code: string;
	description: string;
	descriptionFake?: string;
	ncm: TNcm;
	quantity: number;
	price: number;
	total: number;
	ipi: number;
	baseCalculo: number;
	icms: number;
	baseIcmsSt: number;
	st: number;
	pis: number;
	cofins: number;
	fecp: number;
	valorTotal: number;
	icmsPorcentagem: number;
	intraPorcentagem: number;
	mvaPorcentagem: number;
	difal: number;
	acresc: number;
};
