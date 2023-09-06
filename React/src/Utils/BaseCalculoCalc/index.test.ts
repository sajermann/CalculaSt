/**
 * @vitest-environment jsdom
 */
import { describe, it } from 'vitest';
import { baseCalculoCalc } from '.';

describe('Utils/baseCalculoCalc', () => {
	it(`should return 0`, async () => {
		const result = baseCalculoCalc({
			destinoMercadoria: '',
			estadoDestino: '',
			ncm: '',
			total: 0,
			ipi: 0,
		});
		expect(result).toBe(0);
	});

	it(`should test Revenda - SP - 7413.00.00`, async () => {
		const result = baseCalculoCalc({
			destinoMercadoria: 'Revenda',
			estadoDestino: 'SP',
			ncm: '7413.00.00',
			total: 100,
			ipi: 0,
		});
		expect(result).toBe(66.67);
	});

	it(`should test Revenda - AM`, async () => {
		const result = baseCalculoCalc({
			destinoMercadoria: 'Revenda',
			estadoDestino: 'AM',
			ncm: '7413.00.00',
			total: 100,
			ipi: 0,
		});
		expect(result).toBe(100);
	});

	it(`should test Consumo - RS`, async () => {
		const result = baseCalculoCalc({
			destinoMercadoria: 'Consumo',
			estadoDestino: 'RS',
			ncm: '7413.00.00',
			total: 100,
			ipi: 0,
		});
		expect(result).toBe(100);
	});

	it(`should test error`, async () => {
		const result = baseCalculoCalc({
			destinoMercadoria: {} as string,
			estadoDestino: 'RS',
			ncm: '7413.00.00',
			total: 100,
			ipi: 0,
		});
		expect(result).toBe(0);
	});
});
