/**
 * @vitest-environment jsdom
 */
import { describe, it, vi } from 'vitest';
import { reCalcAll } from '.';
import fecpDb from '../../Assets/Data/fecps.json';
import icmsDb from '../../Assets/Data/icms.json';
import ipiDb from '../../Assets/Data/ipis.json';
import mvaDb from '../../Assets/Data/mvas.json';
import obsDb from '../../Assets/Data/obs.json';

const mock = {
	estadoOrigem: {
		id: '',
		initials: 'SP',
		name: 'São Paulo',
	},
	estadoDestino: {
		id: '31D7552A-7555-10A1-2029-6E00EF210F1E',
		initials: 'RJ',
		name: 'Rio de Janeiro',
		createdAt: '2021-11-03 20:01:21',
		updatedAt: '2021-11-03 20:01:21',
		isBlocked: false,
		isActive: true,
	},
	destinoMercadoria: {
		id: '2',
		name: 'Revenda',
	},
	tipoCalculo: {
		id: '4',
		name: 'Não Aplicado',
	},
	clienteContribuinte: true,
	simplesNacional: false,
	baseDeCalculo: 100,
	icms: 12,
	baseIcmsSt: 155.1,
	st: 15.918,
	total: 100,
	fecp: 0,
	pis: 1.6500000000000001,
	cofins: 7.6,
	ipi: 0,
	totalGeral: 119.02000000000001,
	itens: [
		{
			id: '6ec4b32f-aaff-4beb-a07a-f0fd7231cb26',
			code: '',
			description: '',
			ncm: {
				code: '8544.49.00',
				description:
					'Máquinas, aparelhos e materiais elétricos, e suas partes; aparelhos de gravação ou de reprodução de som, aparelhos de gravação ou de reprodução de imagens e de som em televisão, e suas partes e acessórios - Fios, cabos (incluídos os cabos coaxiais) e outros condutores, constituídos de fibras embainhadas individualmente, mesmo com condutores elétricos ou munidos de peças de conexão - Outros condutores elétricos, para tensão não superior a 1000V: - Outros',
				id: '577679d2-5dcc-6f8f-394e-8d2cd1452a1f',
				createdAt: '2021-11-03T20:37:48',
				updatedAt: '2021-11-03T20:37:48',
				isBlocked: true,
				isActive: true,
			},
			quantity: 10,
			price: 10,
			total: 100,
			ipi: 0,
			baseCalculo: 100,
			icms: 12,
			baseIcmsSt: 155.1,
			st: 15.918,
			pis: 1.6500000000000001,
			cofins: 7.6,
			fecp: 3.102,
			valorTotal: 119.02000000000001,
			icmsPorcentagem: 18,
			intraPorcentagem: 18,
			mvaPorcentagem: 55.1,
			difal: 6,
			acresc: 15.918,
		},
	],
	obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 33/2014. Observação: Fundo Estadual de Combate a Pobreza (FECP) R$ 3,10',
};

describe('Utils/reCalcAll', () => {
	it(`should return true`, async () => {
		const setCalculaStSpy = vi.fn();

		reCalcAll({
			calculaStForRecalcAll: mock,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
			obsDataBase: obsDb,
			setCalculaSt: setCalculaStSpy,
		});
		expect(setCalculaStSpy).toBeCalled();
	});
});
