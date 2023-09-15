/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as useCalculaSt from '~/Hooks/UseCalculaSt';
import * as handleCreateSimulation from '~/Utils/HandleCreateSimulation';
import * as handleUpdateSimulation from '~/Utils/HandleUpdateSimulation';
import { SaveSimulation } from '.';

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
				<SaveSimulation />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

describe('Components/SaveSimulation', () => {
	it(`should simulate create simulation`, async () => {
		const spyHandleCreateSimulation = vi.spyOn(
			handleCreateSimulation,
			'handleCreateSimulation',
		);
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: { ...mock, id: undefined },
			setCalculaSt: vi.fn(),
		}));
		const { getByText, getByLabelText } = render(<Mock />);

		const buttonSave = getByText('SAVE');
		fireEvent.click(buttonSave);

		await waitFor(async () => {
			await expect(getByText('SAVE_SIMULATION')).toBeInTheDocument();
		});

		await waitFor(async () => {
			const inputTitle = getByLabelText('TITLE');
			userEvent.type(inputTitle, 'Test');
		});

		await waitFor(async () => {
			const buttonConfirm = getByText('CONFIRM');
			expect(buttonConfirm).not.toBeDisabled();
			fireEvent.click(buttonConfirm);
		});

		await waitFor(
			async () => {
				await expect(spyHandleCreateSimulation).toBeCalled();
			},
			{
				timeout: 4000,
			},
		);
	});

	it(`should simulate update simulation`, async () => {
		const spyHandleCreateSimulation = vi.spyOn(
			handleUpdateSimulation,
			'handleUpdateSimulation',
		);
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: { ...mock },
			setCalculaSt: vi.fn(),
		}));
		const { getByText } = render(<Mock />);

		const buttonSave = getByText('SAVE');
		fireEvent.click(buttonSave);

		await waitFor(
			async () => {
				await expect(spyHandleCreateSimulation).toBeCalled();
			},
			{
				timeout: 4000,
			},
		);
	});

	it(`should close save dialog without save`, async () => {
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: { ...mock, id: undefined },
			setCalculaSt: vi.fn(),
		}));
		const { getByText, queryByText } = render(<Mock />);

		fireEvent.click(getByText('SAVE'));

		await waitFor(async () => {
			await expect(getByText('SAVE_SIMULATION')).toBeInTheDocument();
			fireEvent.click(getByText('CANCEL'));
		});

		await waitFor(async () => {
			const result = queryByText('SAVE_SIMULATION');
			await expect(result).toBeNull();
		});
	});
});
