/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DeleteSimulation } from '.';

function Mock() {
	return (
		<BrowserRouter>
			<DeleteSimulation />
		</BrowserRouter>
	);
}

describe('Components/DeleteSimulation', () => {
	it(`should add new item to the list`, async () => {
		const spy = vi.fn();
		const { getAllByText, getByTestId } = render(<Mock />);

		const buttonOpen = getAllByText('Delete')[0];
		fireEvent.click(buttonOpen);

		await waitFor(async () => {
			await expect(getAllByText('DELETE_SIMULATION')[0]).toBeInTheDocument();
		});

		// await waitFor(async () => {
		// 	const result = getAllByText('8544.49.00')[0];
		// 	fireEvent.click(result);
		// 	await expect(spy).toBeCalled();
		// });
	});
});
