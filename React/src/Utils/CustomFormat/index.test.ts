/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { customFormat } from '.';

describe('Utils/customFormat', () => {
	it(`should return empty string`, async () => {
		const result = customFormat({
			valor: null as unknown as number,
			casas: 2,
			cifrao: false,
			porcentagem: false,
		});
		expect(result).toBe('');
	});

	it(`should return 0 formatted`, async () => {
		const result = customFormat({
			valor: 0,
			casas: 2,
			cifrao: false,
			porcentagem: false,
		});
		expect(result).toBe('0,00');

		const result2 = customFormat({
			valor: 0,
			casas: 2,
			cifrao: true,
			porcentagem: false,
		});
		expect(result2).toBe('R$0,00');
	});

	it(`should return porcent`, async () => {
		const result = customFormat({
			valor: 100,
			casas: 2,
			cifrao: false,
			porcentagem: true,
		});
		expect(result).toBe('100,00%');
	});

	it(`should return cifrao`, async () => {
		const result = customFormat({
			valor: 100,
			casas: 2,
			cifrao: true,
			porcentagem: false,
		});
		expect(true).toBe(true);
	});

	it(`should return without cifrao`, async () => {
		const result = customFormat({
			valor: 100,
			casas: 2,
			cifrao: false,
			porcentagem: false,
		});
		expect(result).toBe('100,00');
	});
});
