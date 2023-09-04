/* eslint-disable camelcase */
/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { MRT_Localization } from 'material-react-table';
import { describe, vi } from 'vitest';
import '../../Config/i18n';
import * as useTranslation from '../../Hooks/UseTranslation';
import { SelectLanguage } from './index';

describe('Components/SelectLanguage', () => {
	test(`should change language`, async () => {
		const mock = vi.fn();
		vi.spyOn(useTranslation, 'useTranslation').mockImplementation(() => ({
			translate: () => '',
			currentLanguage: 'en',
			changeLanguage: mock,
			localizationMTR: '' as unknown as MRT_Localization,
		}));
		const { getByRole } = render(<SelectLanguage />);
		fireEvent.mouseDown(getByRole('button'));
		const listbox = within(getByRole('listbox'));
		fireEvent.click(listbox.getByText(/Português/i));
		console.log({ listbox });
		await waitFor(() => {
			expect(mock).toBeCalledWith('pt-BR');
		});
	});
});
