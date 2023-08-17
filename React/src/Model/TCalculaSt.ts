import { TBrazilState } from './TBrazilState';
import { TDestinationProduct } from './TDestinationProduct';
import { TItem } from './TItem';
import { TTypeCalc } from './TipoCalculo';

export type TCalculaSt = {
	estadoOrigem: TBrazilState | null;
	estadoDestino: TBrazilState | null;
	destinoMercadoria: TDestinationProduct | null;
	tipoCalculo: TTypeCalc | null;
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
