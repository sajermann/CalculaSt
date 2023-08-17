import { TBrazilState } from '~/Model/TBrazilState';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TIdName } from '~/Model/TIdName';
import { TIdOption } from '~/Model/TIdOption';
import { TItem } from '~/Model/TItem';
import { TNcm } from '~/Model/TNcm';

const BRAZIL_STATE: TBrazilState = {
	id: '',
	initials: '',
	name: '',
};

const ID_NAME: TIdName = {
	id: '',
	name: '',
};

const ID_OPTION: TIdOption = {
	id: '',
	option: '',
};

const NCM: TNcm = {
	id: '',
	code: '',
	description: '',
};

const ITEM: TItem = {
	id: '',
	code: '',
	description: '',
	ncm: NCM,
	quantity: 0,
	price: 0,
	total: 0,
	ipi: 0,
	baseCalculo: 0,
	icms: 0,
	baseIcmsSt: 0,
	st: 0,
	pis: 0,
	cofins: 0,
	fecp: 0,
	valorTotal: 0,
	icmsPorcentagem: 0,
	intraPorcentagem: 0,
	mvaPorcentagem: 0,
	difal: 0,
	acresc: 0,
};

const CALCULA_ST: TCalculaSt = {
	estadoOrigem: null,
	estadoDestino: null,
	destinoMercadoria: ID_NAME,
	tipoCalculo: ID_NAME,
	clienteContribuinte: false,
	simplesNacional: false,
	baseDeCalculo: 0,
	icms: 0,
	baseIcmsSt: 0,
	st: 0,
	total: 0,
	fecp: 0,
	pis: 0,
	cofins: 0,
	ipi: 0,
	totalGeral: 0,
	itens: [],
	obs: '',
};
export const CONST = {
	DEFAULT: {
		BRAZIL_STATE,
		ID_NAME,
		ID_OPTION,
		NCM,
		ITEM,
		CALCULA_ST,
	},
};
