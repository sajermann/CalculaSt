type Props = {
	destinoMercadoria: string;
	estadoDestino: string;
	ncm: string;
	total: number;
	ipi: number;
};

export function baseCalculoCalc({
	destinoMercadoria,
	estadoDestino,
	total,
	ipi,
	ncm,
}: Props): number {
	if (!total || !estadoDestino) return 0;
	if (
		destinoMercadoria === 'Revenda' &&
		estadoDestino === 'SP' &&
		ncm === '7413.00.00'
	)
		return total * 0.6667;
	if (destinoMercadoria === 'Revenda' || estadoDestino === 'AM') return total;
	if (destinoMercadoria === 'Consumo') {
		if (ipi === undefined) return 0;
		return total + ipi;
	}
	console.log('Erro na função Base Calculo Calc');
	return 0;
}
