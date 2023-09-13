/**
 * @vitest-environment jsdom
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as useCalculaSt from '~/Hooks/UseCalculaSt';
import * as handleSaveItem from '~/Utils/HandleSaveItem';
import { CreateItem } from '.';

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

describe('Components/CreateItem', () => {
	it(`should create and save item`, async () => {
		const spy = vi.fn();
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: mock,
			setCalculaSt: spy,
		}));

		const spyHandleSaveItem = vi.spyOn(handleSaveItem, 'handleSaveItem');

		const { getAllByText, getByTestId, getByLabelText } = render(
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
				<CreateItem />
			</QueryClientProvider>,
		);

		const buttonOpen = getByTestId('create-item-button');

		fireEvent.click(buttonOpen);

		await waitFor(async () => {
			await expect(getAllByText('CREATE_ITEM')[0]).toBeInTheDocument();
		});

		const inputQuantidade = getByLabelText(/Quantidade/i);
		await userEvent.type(inputQuantidade, '90');
		const inputPreco = getByLabelText(/Preço/i);
		await userEvent.type(inputPreco, '90');
		// Criar func pra selecionar ncm la da tabela
		const buttonSave = getByTestId('save-button');
		fireEvent.click(buttonSave);
		await waitFor(
			async () => {
				await expect(spyHandleSaveItem).toBeCalled();
			},
			{
				timeout: 4000,
			},
		);
	});
});
