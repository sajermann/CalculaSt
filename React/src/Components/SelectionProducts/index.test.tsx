/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ncmDb from '~/Assets/Data/ncms.json';
import { InjectorProviders } from '~/Components/InjectorProviders';
import * as useDataBase from '~/Hooks/UseDataBase';
import { TNcm } from '~/Model/TNcm';
import { TUseDataBase } from '~/Model/TUseDatabase';
import { SelectionProducts } from '.';

type Props = {
	handleSelectNcm: (data: TNcm) => void;
};

function Mock({ handleSelectNcm }: Props) {
	return (
		<InjectorProviders>
			<SelectionProducts handleSelectNcm={handleSelectNcm} />
		</InjectorProviders>
	);
}

describe('Components/SelectionProducts', () => {
	it(`should select ncm`, async () => {
		const spy = vi.fn();
		vi.spyOn(useDataBase, 'useDataBase').mockImplementation(
			() =>
				({
					ncmDataBase: [...ncmDb],
				}) as unknown as TUseDataBase,
		);
		const { getAllByText, getByTestId } = render(
			<Mock handleSelectNcm={spy} />,
		);

		const buttonOpen = getByTestId('open-dialog-search-ncm');
		fireEvent.click(buttonOpen);

		await waitFor(async () => {
			await expect(getAllByText('8544.49.00')[0]).toBeInTheDocument();
		});

		const result = getAllByText('8544.49.00')[0];
		fireEvent.click(result);
		await expect(spy).toBeCalledWith(ncmDb[0]);
	});
});
