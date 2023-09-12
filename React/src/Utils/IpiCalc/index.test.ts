/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { TIpi } from '~/Model/TIpi';
import { ipiCalc } from '.';
import ipiDb from '../../Assets/Data/ipis.json';

describe('Utils/ipiCalc', () => {
	it(`should test total 0`, async () => {
		const result = ipiCalc({
			estadoDestino: 'SP',
			total: 0,
			ncm: '',
			ipiDataBase: [],
		});
		expect(result).toBe(0);
	});

	it(`should test AM`, async () => {
		const result = ipiCalc({
			estadoDestino: 'AM',
			total: 100,
			ncm: '8544.49.00',
			ipiDataBase: ipiDb,
		});
		expect(result).toBe(0);
	});

	it(`should test SP`, async () => {
		const result = ipiCalc({
			estadoDestino: 'SP',
			total: 100,
			ncm: '8544.60.00',
			ipiDataBase: ipiDb,
		});
		expect(result).toBe(5);
	});

	it(`should test error`, async () => {
		const result = ipiCalc({
			estadoDestino: 'SP',
			total: 100,
			ncm: '8544.60.00',
			ipiDataBase: {} as TIpi[],
		});
		expect(result).toBe(0);
	});
});
