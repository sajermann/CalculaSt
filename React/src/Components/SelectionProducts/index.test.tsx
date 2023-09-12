/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ncmDb from '~/Assets/Data/ncms.json';
import { InjectorProviders } from '~/Components/InjectorProviders';
import { TNcm } from '~/Model/TNcm';
import { SelectionProducts } from '.';

type Props = {
	ncmDataBase: TNcm[];
	handleSelectNcm: (data: TNcm) => void;
};

function Mock({ handleSelectNcm, ncmDataBase }: Props) {
	return (
		<InjectorProviders>
			<SelectionProducts
				handleSelectNcm={handleSelectNcm}
				ncmDataBase={ncmDataBase}
			/>
		</InjectorProviders>
	);
}

describe('Components/SelectionProducts', () => {
	it(`should add new item to the list`, async () => {
		const spy = vi.fn();
		const { getAllByText, getByTestId } = render(
			<Mock handleSelectNcm={spy} ncmDataBase={ncmDb} />,
		);

		const buttonOpen = getByTestId('open-dialog-search-ncm');
		fireEvent.click(buttonOpen);

		await waitFor(async () => {
			await expect(getAllByText('8544.49.00')[0]).toBeInTheDocument();
		});

		await waitFor(async () => {
			const result = getAllByText('8544.49.00')[0];
			fireEvent.click(result);
			await expect(spy).toBeCalled();
		});
	});
});
