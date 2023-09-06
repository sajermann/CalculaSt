/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { acrescimoCalc } from '.';

describe('Utils/acrescimoCalc', () => {
	it(`should return 0`, async () => {
		const result = acrescimoCalc({
			total: 0,
			st: 100,
		});
		expect(result).toBe(0);
	});

	it(`should return 0`, async () => {
		const result = acrescimoCalc({
			total: 110,
			st: 100,
		});
		expect(result).toBe(90.9090909090909);
	});
});
