/**
 * @vitest-environment jsdom
 */
import { render, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/Components/InjectorProviders';
import * as useCalculaSt from '~/Hooks/UseCalculaSt';
import { MainItems } from '.';

function Mock() {
	return (
		<InjectorProviders>
			<MainItems />
		</InjectorProviders>
	);
}

describe('Components/MainItems', () => {
	it(`should add new item to the list`, async () => {
		const { getAllByText } = render(<Mock />);
		vi.spyOn(useCalculaSt, 'useCalculaSt').mockImplementation(() => ({
			calculaSt: {
				title: 'Test',
				estadoOrigem: {},
				estadoDestino: {},
				destinoMercadoria: {},
				tipoCalculo: {},
				clienteContribuinte: false,
				simplesNacional: false,
				baseDeCalculo: 15999.99,
				icms: 99.9,
				baseIcmsSt: 99.9,
				st: 99.9,
				total: 99.9,
				fecp: 99.9,
				pis: 99.9,
				cofins: 99.9,
				ipi: 99.9,
				totalGeral: 99.9,
				itens: [
					{
						id: '',
						code: '',
						description: '',
						descriptionFake: '',
						ncm: {
							id: '',
							code: '',
							description: '',
						},
						quantity: 0,
						price: 0,
						total: 99.9,
						ipi: 0,
						baseCalculo: 15999.99,
						icms: 99.9,
						baseIcmsSt: 0,
						st: 99.9,
						pis: 0,
						cofins: 0,
						fecp: 0,
						valorTotal: 0,
						icmsPorcentagem: 0,
						intraPorcentagem: 0,
						mvaPorcentagem: 0,
						difal: 0,
						acresc: 0,
					},
				],
				obs: '',
			},
		}));
		renderHook(() => useCalculaSt.useCalculaSt(), { wrapper: Mock });
		waitFor(() => {
			expect(getAllByText('15.999,99')[0]).toBeInTheDocument();
		});
	});
});
