/**
 * @vitest-environment jsdom
 */
import { waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { handleSimulateFetch } from '.';

describe('Utils/handleSimulateFetch', () => {
	it(`should call setSuccess`, async () => {
		const mock = vi.fn();
		handleSimulateFetch({
			isLoading: false,
			setSuccess: vi.fn(),
			setLoading: vi.fn(),
			setIsOpen: mock,
			onFinalize: vi.fn(),
		});
		await waitFor(
			async () => {
				await expect(mock).toBeCalled();
			},
			{
				timeout: 3000,
			},
		);
	});
});
