/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { countForPagination } from '.';

describe('Utils/countForPagination', () => {
	it(`should return array with values`, async () => {
		const result = countForPagination(10);
		expect(result).toEqual([1, 5, 10]);

		const result2 = countForPagination(60);
		expect(result2).toEqual([1, 5, 10, 20, 30, 40, 50, 60]);
	});
});
