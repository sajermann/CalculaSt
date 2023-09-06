/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { difalCalc } from '.';
import icmsDb from '../../Assets/Data/icms.json';

describe('Utils/difalCalc', () => {
	it(`should test difal of RS`, async () => {
		const result = difalCalc({
			icmsDataBase: icmsDb,
			estadoDestino: 'RS',
			total: 100,
			ipi: 5,
		});
		expect(result).toBe(5.7749999999999995);
	});
	it(`should throw exception`, async () => {
		const result = difalCalc({
			icmsDataBase: [],
			estadoDestino: 'RS',
			total: 100,
			ipi: 5,
		});
		expect(result).toBe(0);
	});
});
