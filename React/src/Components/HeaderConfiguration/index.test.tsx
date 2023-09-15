/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as useCalculaSt from '~/Hooks/UseCalculaSt';
import * as useDataBase from '~/Hooks/UseDataBase';
import * as handleDestinationProduct from '~/Utils/HandleDestinationProduct';
import * as handleBrazilState from '~/Utils/HandleBrazilState';
import * as handleTypeCalc from '~/Utils/HandleTypeCalc';
import * as handleClienteContribuinte from '~/Utils/HandleClienteContribuinte';
import * as handleSimplesNacional from '~/Utils/HandleSimplesNacional';
import * as mustDisabled from '~/Utils/MustDisabled';
import fpcDb from '~/Assets/Data/fecps.json';
import brazilStatesDb from '~/Assets/Data/brazilStates.json';
import icmsDb from '~/Assets/Data/icms.json';
import mvaDb from '~/Assets/Data/mvas.json';
import ipiDb from '~/Assets/Data/ipis.json';
import obsDb from '~/Assets/Data/obs.json';
import ncmDb from '~/Assets/Data/ncms.json';
import { HeaderConfiguration } from '.';

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

function Mock() {
	return (
		<BrowserRouter>
			<QueryClientProvider
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								refetchOnWindowFocus: false,
								retry: false,
							},
						},
						logger: {
							log: console.log,
							warn: console.warn,
							// ✅ no more errors on the console for tests
							error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
						},
					})
				}
			>
				<HeaderConfiguration />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

describe('Components/HeaderConfiguration', () => {
	it(`should test HandleBrazilState`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: { ...mock, id: undefined },
			setCalculaSt: vi.fn(),
		}));
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			brazilStatesDataBase: brazilStatesDb,
			fecpDataBase: fpcDb,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			obsDataBase: obsDb,
			ncmDataBase: ncmDb,
		}));
		const spyHandleBrazilState = vi.spyOn(
			handleBrazilState,
			'handleBrazilState',
		);
		const { getByLabelText } = render(<Mock />);

		await waitFor(() => {
			fireEvent.click(getByLabelText('Para'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(spyHandleBrazilState).toBeCalled();
	});

	it(`should test HandleBrazilState`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: { ...mock, id: undefined },
			setCalculaSt: vi.fn(),
		}));
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			brazilStatesDataBase: brazilStatesDb,
			fecpDataBase: fpcDb,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			obsDataBase: obsDb,
			ncmDataBase: ncmDb,
		}));
		const spyHandleDestinationProduct = vi.spyOn(
			handleDestinationProduct,
			'handleDestinationProduct',
		);
		const { getByLabelText } = render(<Mock />);

		await waitFor(() => {
			fireEvent.click(getByLabelText('Destino Mercadoria'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(spyHandleDestinationProduct).toBeCalled();
	});

	it(`should test HandleTypeCalc`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: {
				...mock,
				destinoMercadoria: {
					id: '1',
					name: 'Consumo',
				},
			},
			setCalculaSt: vi.fn(),
		}));
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			brazilStatesDataBase: brazilStatesDb,
			fecpDataBase: fpcDb,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			obsDataBase: obsDb,
			ncmDataBase: ncmDb,
		}));
		const spyHandleTypeCalc = vi.spyOn(handleTypeCalc, 'handleTypeCalc');
		const { getByLabelText } = render(<Mock />);

		await waitFor(() => {
			fireEvent.click(getByLabelText('Tipo Cálculo'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(spyHandleTypeCalc).toBeCalled();
	});

	it(`should test HandleClienteContribuinte`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: {
				...mock,
				destinoMercadoria: {
					id: '1',
					name: 'Consumo',
				},
			},
			setCalculaSt: vi.fn(),
		}));
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			brazilStatesDataBase: brazilStatesDb,
			fecpDataBase: fpcDb,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			obsDataBase: obsDb,
			ncmDataBase: ncmDb,
		}));
		const spyHandleClienteContribuinte = vi.spyOn(
			handleClienteContribuinte,
			'handleClienteContribuinte',
		);
		const { getByLabelText } = render(<Mock />);

		await waitFor(() => {
			fireEvent.click(getByLabelText('Cliente Contribuinte'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(spyHandleClienteContribuinte).toBeCalled();
	});

	it.skip(`should test HandleSimplesNacional`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: {
				estadoOrigem: {
					id: '',
					initials: 'SP',
					name: 'São Paulo',
				},
				estadoDestino: {
					id: '110AFC00-7CC0-7EB4-9B52-51DA229E9168',
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
				itens: [],
				obs: 'Protocolo do estado: ICMS retido por substituicao tributaria conforme protocolo 91/2009.',
				id: '57d6bca5-8a53-4ffa-a7b0-e23449690d2d',
				title: 'RS-Cobre',
			},
			setCalculaSt: vi.fn(),
		}));
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			brazilStatesDataBase: brazilStatesDb,
			fecpDataBase: fpcDb,
			icmsDataBase: icmsDb,
			ipiDataBase: ipiDb,
			mvaDataBase: mvaDb,
			obsDataBase: obsDb,
			ncmDataBase: ncmDb,
		}));
		vi.spyOn(mustDisabled, 'mustDisabled').mockReturnValue(false);

		const spyHandleSimplesNacional = vi.spyOn(
			handleSimplesNacional,
			'handleSimplesNacional',
		);
		const { getByLabelText } = render(<Mock />);

		await waitFor(async () => {
			expect(getByLabelText('Simples Nacional')).not.toBeDisabled();
			fireEvent.click(getByLabelText('Simples Nacional'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(spyHandleSimplesNacional).toBeCalled();
	});
});
