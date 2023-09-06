/* eslint-disable import/order */
/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { obsCalc } from '.';
import fdas from '../../Assets/Data/obs.json';

const mockSimulationSp = {
	estadoOrigem: {
		id: '',
		initials: 'SP',
		name: 'São Paulo',
	},
	estadoDestino: {
		id: '82B924D7-1E68-1396-8AB4-2B4E2AD27454',
		initials: 'SP',
		name: 'São Paulo',
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
	baseDeCalculo: 1024,
	icms: 184.32,
	baseIcmsSt: 1443.84,
	st: 75.57119999999998,
	total: 1024,
	fecp: 0,
	pis: 16.896,
	cofins: 77.824,
	ipi: 0,
	totalGeral: 1099.5711999999999,
	itens: [
		{
			id: '732885e0-a5d2-4c1c-88f5-80ac880a160c',
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
			quantity: 32,
			price: 32,
			total: 1024,
			ipi: 0,
			baseCalculo: 1024,
			icms: 184.32,
			baseIcmsSt: 1443.84,
			st: 75.57119999999998,
			pis: 16.896,
			cofins: 77.824,
			fecp: 0,
			valorTotal: 1099.5711999999999,
			icmsPorcentagem: 18,
			intraPorcentagem: 18,
			mvaPorcentagem: 41,
			difal: 0,
			acresc: 7.379999999999997,
		},
	],
	obs: '',
	id: '963bb88f-2a4c-41e5-890d-acd035ebbc03',
	title: 'cas',
};

const mockSimulationRj = {
	estadoOrigem: {
		id: '',
		initials: 'SP',
		name: 'São Paulo',
	},
	estadoDestino: {
		id: '82B924D7-1E68-1396-8AB4-2B4E2AD27453',
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
	baseDeCalculo: 1024,
	icms: 184.32,
	baseIcmsSt: 1443.84,
	st: 75.57119999999998,
	total: 1024,
	fecp: 10,
	pis: 16.896,
	cofins: 77.824,
	ipi: 0,
	totalGeral: 1099.5711999999999,
	itens: [
		{
			id: '732885e0-a5d2-4c1c-88f5-80ac880a160c',
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
			quantity: 32,
			price: 32,
			total: 1024,
			ipi: 0,
			baseCalculo: 1024,
			icms: 184.32,
			baseIcmsSt: 1443.84,
			st: 75.57119999999998,
			pis: 16.896,
			cofins: 77.824,
			fecp: 10,
			valorTotal: 1099.5711999999999,
			icmsPorcentagem: 18,
			intraPorcentagem: 18,
			mvaPorcentagem: 41,
			difal: 0,
			acresc: 7.379999999999997,
		},
	],
	obs: '',
	id: '963bb88f-2a4c-41e5-890d-acd035ebbc03',
	title: 'cas',
};

const mockSimulationError = {
	...mockSimulationRj,
	clienteContribuinte: false,
};

describe('Utils/ObsCalc', () => {
	it(`should return obs correctly - SP`, async () => {
		const result = obsCalc({
			calculaSt: { ...mockSimulationSp },
			obsDataBase: [...fdas],
		});
		expect(result).toBe(
			'Protocolo do estado: Subst.Trib.Art.313-Z17 Ricms/Sp Mva 41% e 97%. Destinatário deverá c/ relação as operações c/ mercadoria ou prestações de serviço recebidas c/ imp.retido,escriturar o documento fiscal nos termos do art.278 do RICMS.',
		);
	});

	it(`should return obs correctly - RJ`, () => {
		const result2 = obsCalc({
			calculaSt: { ...mockSimulationRj },
			obsDataBase: [...fdas],
		});
		// expect(result2).toBe(
		// 	'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 33/2014. Observação: Fundo Estadual de Combate a Pobreza (FECP) R$ 10,00',
		// );
	});

	it(`should return obs error`, () => {
		const result3 = obsCalc({
			calculaSt: { ...mockSimulationError },
			obsDataBase: [...fdas],
		});
		expect(result3).toBe('Erro');
	});
});
