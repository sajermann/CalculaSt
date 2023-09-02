/**
 * @vitest-environment jsdom
 */
import { render, renderHook } from '@testing-library/react';
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
		const { getByText } = render(<Mock />);
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
				itens: [{}, {}],
				obs: '',
			},
		}));
		renderHook(() => useCalculaSt.useCalculaSt(), { wrapper: Mock });
		expect(getByText('15.999,99')).toBeInTheDocument();
	});
});
