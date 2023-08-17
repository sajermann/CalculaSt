type Props = {
	casas: number;
	valor: number;
	cifrao: boolean;
	porcentagem: boolean;
};

export function customFormatReal({
	valor,
	casas = 2,
	cifrao = false,
	porcentagem = false,
}: Props): string {
	if (valor != null) {
		if (valor === 0) {
			if (cifrao) return 'R$0,00';
			return '0,00';
		}
		let t;
		if (porcentagem) {
			t = Intl.NumberFormat('pt-BR', {
				style: 'percent',
				minimumFractionDigits: casas,
			}).format(valor / 100);
			return t;
		}
		if (cifrao) {
			return Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: casas,
			}).format(valor);
		}
		return Intl.NumberFormat('pt-BR', {
			currency: 'BRL',
			minimumFractionDigits: casas,
		}).format(valor);
	}
	console.error('Error customFormat', valor, casas, cifrao, porcentagem);
	return '';
}
