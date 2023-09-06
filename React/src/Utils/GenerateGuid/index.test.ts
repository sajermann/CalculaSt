/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import Guid from '.';

describe('Utils/fecpCalc', () => {
	it(`should test length of guid`, async () => {
		const result = Guid.new();
		expect(result.length).toBe(36);
	});
});
