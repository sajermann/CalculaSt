/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DeleteSimulation } from '.';
import { Toast } from '../Toast';

function Mock() {
	return (
		<BrowserRouter>
			<Toast />
			<DeleteSimulation />
		</BrowserRouter>
	);
}

describe('Components/DeleteSimulation', () => {
	it(`should simulate delete simulation`, async () => {
		vi.mock('react-router-dom', async () => {
			const mod = await vi.importActual<any>('react-router-dom');
			return {
				...mod,
				useParams: () => ({ id: 'Test' }),
			};
		});
		const { getByText } = render(<Mock />);

		const buttonOpen = getByText('DELETE');
		fireEvent.click(buttonOpen);

		await waitFor(async () => {
			await expect(getByText('DELETE_SIMULATION')).toBeInTheDocument();
		});

		const confirmButton = getByText('CONFIRM');
		fireEvent.click(confirmButton);
		await waitFor(
			async () => {
				await expect(getByText('Excluído com sucesso')).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);
	});
});
