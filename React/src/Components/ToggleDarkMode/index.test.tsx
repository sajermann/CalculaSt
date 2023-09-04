/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import * as useDarkMode from '~/Hooks/UseDarkMode';
import { ToggleDarkMode } from '.';
import '../../Config/i18n';

describe('Components/ToggleDarkMode', () => {
	it(`should change dark mode`, async () => {
		const mock = vi.fn();

		vi.spyOn(useDarkMode, 'useDarkMode').mockImplementation(() => ({
			isDarkMode: true,
			setIsDarkMode: mock,
		}));
		const { getByRole } = await render(<ToggleDarkMode />);
		await fireEvent.click(getByRole('checkbox'));
		await waitFor(() => {
			expect(mock).toBeCalledWith(false);
		});
	});
});
