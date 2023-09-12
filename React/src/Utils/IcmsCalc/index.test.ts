/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { TIcms } from '~/Model/TIcms';
import { icmsCalc } from '.';
import icmsDb from '../../Assets/Data/icms.json';

describe('Utils/icmsCalc', () => {
	it(`should test SP Success`, async () => {
		const result = icmsCalc({
			estadoDestino: 'SP',
			baseCalculo: 100,
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(18);
	});

	it(`should test SP Failed`, async () => {
		const result = icmsCalc({
			estadoDestino: 'SP',
			baseCalculo: 100,
			icmsDataBase: {} as TIcms[],
		});
		expect(result).toBe(0);
	});
});
