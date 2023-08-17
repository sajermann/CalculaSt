import { TBrazilState } from './TBrazilState';
import { TDestinationProduct } from './TDestinationProduct';
import { TItem } from './TItem';
import { TTypeCalc } from './TipoCalculo';

export type TCalculaSt = {
	estadoOrigem: TBrazilState;
	estadoDestino: TBrazilState;
	destinoMercadoria: TDestinationProduct;
	tipoCalculo: TTypeCalc;
	clienteContribuinte: boolean;
	simplesNacional: boolean;
	baseDeCalculo: number;
	icms: number;
	baseIcmsSt: number;
	st: number;
	total: number;
	fecp: number;
	pis: number;
	cofins: number;
	ipi: number;
	totalGeral: number;
	itens: TItem[];
	obs: string;
};
