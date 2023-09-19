/* eslint-disable import/order */
/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { stCalc } from '.';
import icmsDb from '../../Assets/Data/icms.json';

describe('Utils/StCalc', () => {
	it(`should return 0 if icms to be undefined or icmsDataBase is empty`, async () => {
		const result = stCalc({
			calculaSt: {} as TCalculaSt,
			icms: undefined as unknown as number,
			baseIcmsSt: 0,
			ipi: 0,
			total: 0,
			icmsDataBase: [],
		});
		expect(result).toBe(0);

		const result2 = stCalc({
			calculaSt: {} as TCalculaSt,
			icms: 0,
			baseIcmsSt: 0,
			ipi: 0,
			total: 0,
			icmsDataBase: [],
		});
		expect(result2).toBe(0);
	});

	it(`should test revenda and base icms st`, async () => {
		const mock = {
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
			baseDeCalculo: 100,
			icms: 18,
			baseIcmsSt: 141,
			st: 7.379999999999999,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 107.38,
			itens: [
				{
					id: 'c90608f5-8478-4c16-b753-95151d25df24',
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
					baseCalculo: 100,
					price: 10,
					total: 100,
					ipi: 0,
					icms: 18,
					baseIcmsSt: 141,
					st: 7.379999999999999,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 107.38,
					icmsPorcentagem: 18,
					intraPorcentagem: 18,
					mvaPorcentagem: 41,
					difal: 0,
					acresc: 7.379999999999999,
				},
			],
			obs: 'Protocolo do estado: Subst.Trib.Art.313-Z17 Ricms/Sp Mva 41% e 97%. Destinatário deverá c/ relação as operações c/ mercadoria ou prestações de serviço recebidas c/ imp.retido,escriturar o documento fiscal nos termos do art.278 do RICMS.',
			id: '83fc3a8d-39a6-4176-8017-f51fdd2afe69',
			title: 'SP',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 18,
			baseIcmsSt: 141,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(7.379999999999999);

		const result2 = stCalc({
			calculaSt: mock,
			icms: 0,
			baseIcmsSt: 0,
			ipi: 0,
			total: 0,
			icmsDataBase: icmsDb,
		});
		expect(result2).toBe(0);
	});

	it(`should test Pr Revenda com Simples Nacional`, async () => {
		const mock = {
			estadoOrigem: {
				id: '',
				initials: 'SP',
				name: 'São Paulo',
			},
			estadoDestino: {
				id: '9EC81BD2-6A6C-5646-5DE8-45571E842AE5',
				initials: 'PR',
				name: 'Paraná',
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
			simplesNacional: true,
			baseDeCalculo: 100,
			icms: 12,
			baseIcmsSt: 145.95,
			st: 14.270999999999997,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 114.271,
			itens: [
				{
					id: 'a6fbd94d-068a-4e6c-a617-11f3927be63f',
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
					baseIcmsSt: 145.95,
					st: 14.270999999999997,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 114.271,
					icmsPorcentagem: 18,
					intraPorcentagem: 18,
					mvaPorcentagem: 45.95,
					difal: 6,
					acresc: 14.270999999999997,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 26/2013. Observação: Operação destinada a contribuinte enquadrado no Simples Nacional - MVA reduzida - Art. 15 do Anexo X do RICMS/PR.',
			id: '8ea4f04b-8050-4b65-b660-ecf8ba0687e6',
			title: 'PR-SN',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 145.95,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(14.270999999999997);
	});

	it(`should test RS Consumo Fora`, async () => {
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
				id: '1',
				name: 'Fora',
			},
			clienteContribuinte: true,
			simplesNacional: false,
			baseDeCalculo: 100,
			icms: 12,
			baseIcmsSt: 100,
			st: 5.499999999999999,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 105.5,
			itens: [
				{
					id: 'a2b7595e-cbf4-4c1f-8f28-c57c4990c4a3',
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
					icms: 12,
					baseCalculo: 100,
					baseIcmsSt: 100,
					st: 5.499999999999999,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 105.5,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 0,
					difal: 5.499999999999999,
					acresc: 5.499999999999999,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
			id: 'adabb9b3-e116-47ac-b070-6cd3c3b047e1',
			title: 'RS-Consumo-Fora-Contribuinte',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 145.95,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(5.499999999999999);
	});

	it(`should test RS Consumo Dentro`, async () => {
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
					id: 'b56cc2c1-1ad4-47bc-bb7e-201115ab3356',
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
					baseCalculo: 100,
					price: 10,
					total: 100,
					ipi: 0,
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
			id: 'a9ce4807-cdae-4175-97bd-c93630808ce5',
			title: 'RS-Consumo-Dentro',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(6.666666666666668);
	});

	it(`should test RS Consumo Dentro`, async () => {
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
					id: 'b56cc2c1-1ad4-47bc-bb7e-201115ab3356',
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
					baseCalculo: 100,
					price: 10,
					total: 100,
					ipi: 0,
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
			id: 'a9ce4807-cdae-4175-97bd-c93630808ce5',
			title: 'RS-Consumo-Dentro',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(6.666666666666668);
	});

	it(`should test RS Consumo Bs Dupla`, async () => {
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
				id: '3',
				name: 'BS Dupla',
			},
			clienteContribuinte: true,
			simplesNacional: false,
			baseDeCalculo: 100,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			st: 5.866666666666666,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 105.86666666666666,
			itens: [
				{
					id: '6b145382-48e7-422a-934e-cd6eefd28cc2',
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
					st: 5.866666666666666,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 105.86666666666666,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 0,
					difal: 5.499999999999999,
					acresc: 5.866666666666666,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
			id: 'bc5ad2d9-fdf7-450e-a5d8-6f1eb3b8f6b1',
			title: 'Rs-Consumo-BsDupla',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(5.866666666666666);
	});

	it(`should return 0`, async () => {
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
				id: '4',
				name: 'Não Aplicado',
			},
			clienteContribuinte: true,
			simplesNacional: false,
			baseDeCalculo: 100,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			st: 5.866666666666666,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 105.86666666666666,
			itens: [
				{
					id: '6b145382-48e7-422a-934e-cd6eefd28cc2',
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
					icms: 12,
					baseCalculo: 100,
					baseIcmsSt: 106.66666666666667,
					st: 5.866666666666666,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 105.86666666666666,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 0,
					difal: 5.499999999999999,
					acresc: 5.866666666666666,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
			id: 'bc5ad2d9-fdf7-450e-a5d8-6f1eb3b8f6b1',
			title: 'Rs-Consumo-BsDupla',
		};
		const result = stCalc({
			calculaSt: mock,
			icms: 12,
			baseIcmsSt: 106.66666666666667,
			ipi: 0,
			total: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(0);
	});
});
