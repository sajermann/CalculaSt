/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { TIcms } from '~/Model/TIcms';
import { icmsPorcentagemCalc } from '.';
import icmsDb from '../../Assets/Data/icms.json';

describe('Utils/icmsPorcentagemCalc', () => {
	it(`should test SP Success`, async () => {
		const result = icmsPorcentagemCalc({
			estadoDestino: 'SP',
			icmsDataBase: icmsDb,
		});
		expect(result).toBe(18);
	});

	it(`should test SP Failed`, async () => {
		const result = icmsPorcentagemCalc({
			estadoDestino: 'SP',
			icmsDataBase: {} as TIcms[],
		});
		expect(result).toBe(0);
	});
});
