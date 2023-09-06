/* eslint-disable import/order */
/**
 * @vitest-environment jsdom
 */
import { describe, it, vi } from 'vitest';
import { reCalcHeader } from '.';

describe('Utils/reCalcHeader', () => {
	it(`should return true`, async () => {
		const mock = {
			estadoOrigem: {
				id: '',
				initials: 'SP',
				name: 'São Paulo',
			},
			estadoDestino: {
				id: '110AFC00-7CC0-7EB4-9B52-51DA229E9168',
				initials: 'RS',
				name: 'Rio Grande do Sul',
				createdAt: '2021-11-03 20:01:21',
				updatedAt: '2021-11-03 20:01:21',
				isBlocked: false,
				isActive: true,
			},
			destinoMercadoria: {
				id: '1',
				name: 'Consumo',
			},
			tipoCalculo: {
				id: '2',
				name: 'Dentro',
			},
			clienteContribuinte: true,
			simplesNacional: false,
			baseDeCalculo: 100,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			st: 6.666666666666668,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 106.66666666666667,
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
					baseIcmsSt: 106.66666666666667,
					st: 6.666666666666668,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 106.66666666666667,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 0,
					difal: 5.499999999999999,
					acresc: 6.666666666666668,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
		};
		const mockSetCalculaSt = vi.fn();
		const result = reCalcHeader({
			calculaStForRecalc: mock,
			setCalculaSt: mockSetCalculaSt,
		});
		expect(result).toBe(true);
		expect(mockSetCalculaSt).toBeCalled();
	});
});
