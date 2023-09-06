/**
 * @vitest-environment jsdom
 */
import { waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { handleSaveItem } from '.';

describe('Utils/handleSaveItem', () => {
	it(`should call setSuccess`, async () => {
		const mock = vi.fn();
		handleSaveItem({
			isLoading: false,
			setSuccess: vi.fn(),
			setLoading: vi.fn(),
			setIsOpen: mock,
			onFinalize: vi.fn(),
			handleResetInfos: vi.fn(),
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
