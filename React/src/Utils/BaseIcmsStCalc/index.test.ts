/* eslint-disable import/order */
/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { baseIcmsStCalc } from '.';
import fecpDb from '../../Assets/Data/fecps.json';
import icmsDb from '../../Assets/Data/icms.json';
import mvaDb from '../../Assets/Data/mvas.json';

describe('Utils/baseIcmsStCalc', () => {
	it(`should return 0 if icms to be undefined or icmsDataBase is empty`, async () => {
		const result = baseIcmsStCalc({
			calculaSt: {} as TCalculaSt,
			total: 0,
			ipi: 0,
			ncm: '',
			icms: 0,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result).toBe(0);

		const result2 = baseIcmsStCalc({
			calculaSt: {
				estadoDestino: { name: 'Test' },
				destinoMercadoria: { name: 'Revenda' },
			} as TCalculaSt,
			total: 0,
			ipi: 0,
			ncm: '3',
			icms: 0,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result2).toBe(0);
	});
	it(`should test cobre nu RS revenda`, async () => {
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
			baseIcmsSt: 211.01299999999998,
			st: 24.927274999999995,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 124.927275,
			itens: [
				{
					id: '90d4db23-3226-47a1-9f56-f75d357846f3',
					code: '',
					description: '',
					ncm: {
						code: '7413.00.00',
						description:
							'Cobre e suas obras - Cordas, cabos, tranças (entrançados*) e artigos semelhantes, de cobre, não isolados para usos elétricos.',
						id: 'e50ffe05-34ac-8c52-6047-4fca988c7119',
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
					baseIcmsSt: 211.01299999999998,
					st: 24.927274999999995,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 124.927275,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 110.13,
					difal: 5.499999999999999,
					acresc: 24.927274999999995,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
			id: '57d6bca5-8a53-4ffa-a7b0-e23449690d2d',
			title: 'RS-Cobre',
		};
		const result = baseIcmsStCalc({
			calculaSt: mock,
			total: 100,
			ipi: 0,
			ncm: '7413.00.00',
			icms: 12,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result).toBe(211.01299999999998);
	});
	it(`should test cobre RS revenda`, async () => {
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
			baseIcmsSt: 150.4,
			st: 14.32,
			total: 100,
			fecp: 0,
			pis: 1.6500000000000001,
			cofins: 7.6,
			ipi: 0,
			totalGeral: 114.32,
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
					baseIcmsSt: 150.4,
					st: 14.32,
					pis: 1.6500000000000001,
					cofins: 7.6,
					fecp: 0,
					valorTotal: 114.32,
					icmsPorcentagem: 17.5,
					intraPorcentagem: 17.5,
					mvaPorcentagem: 50.4,
					difal: 5.499999999999999,
					acresc: 14.32,
				},
			],
			obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
		};
		const result = baseIcmsStCalc({
			calculaSt: mock,
			total: 100,
			ipi: 0,
			ncm: '8544.49.00',
			icms: 12,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result).toBe(150.4);
	});
	it(`should test RS consumo fora contribuinte`, async () => {
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
		};
		const result = baseIcmsStCalc({
			calculaSt: mock,
			total: 100,
			ipi: 0,
			ncm: '8544.49.00',
			icms: 12,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result).toBe(100);
	});
	it(`should test RS consumo dentro contribuinte`, async () => {
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
		const result = baseIcmsStCalc({
			calculaSt: mock,
			total: 100,
			ipi: 0,
			ncm: '8544.49.00',
			icms: 12,
			icmsDataBase: icmsDb,
			mvaDataBase: mvaDb,
			fecpDataBase: fecpDb,
		});
		expect(result).toBe(106.66666666666667);
	});
});
