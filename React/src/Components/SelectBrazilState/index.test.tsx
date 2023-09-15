/* eslint-disable camelcase */
/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import brazilStatesDb from '~/Assets/Data/brazilStates.json';
import '../../Config/i18n';

import { SelectBrazilState } from '.';

describe('Components/SelectBrazilState', () => {
	test(`should change language`, async () => {
		const mock = vi.fn();
		const { getByRole } = render(
			<SelectBrazilState
				label="Test"
				states={brazilStatesDb}
				handleBrazilState={mock}
			/>,
		);
		await waitFor(() => {
			fireEvent.click(getByRole('button'));
			userEvent.keyboard('[ArrowUp]');
			userEvent.keyboard('[Enter]');
		});

		expect(mock).toBeCalledWith({
			createdAt: '2021-11-03 20:01:21',
			id: 'DD64AD62-0348-7048-2E83-BFAD564D2EF9',
			initials: 'MG',
			isActive: true,
			isBlocked: false,
			name: 'Minas Gerais',
			updatedAt: '2021-11-03 20:01:21',
		});
	});
});
