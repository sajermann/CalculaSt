/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/Components/InjectorProviders';
import * as useDataBase from '~/Hooks/UseDataBase';
import { Home } from '.';

function Mock() {
	return (
		<InjectorProviders>
			<Home />
		</InjectorProviders>
	);
}

describe('Pages/Home', () => {
	it(`should add new item to the list`, async () => {
		const { getByText, getAllByLabelText } = render(<Mock />);
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(() => ({
			fecpDataBase: [],
			icmsDataBase: [],
			ipiDataBase: [],
			mvaDataBase: [],
			ncmDataBase: [],
			obsDataBase: [],
			brazilStatesDataBase: [{ id: 'T', initials: 'TE', name: 'Test' }],
		}));
		expect(getByText('Dashboard')).toBeInTheDocument();

		renderHook(() => useDataBase.useDataBase(), { wrapper: Mock });
		const autocomplete = getAllByLabelText('Estado')[0];
		const input = autocomplete.closest('input')!;
		await autocomplete.focus();
		await userEvent.type(input, 'Tes');
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'Enter' });
		await fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
		await fireEvent.keyDown(autocomplete, { key: 'Enter' });
	});
});
