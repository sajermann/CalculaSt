import { TIpi } from '~/Model/TIpi';

type Props = {
	estadoDestino: string;
	ncm: string;
	total: number;
	ipiDataBase: TIpi[];
};

export function ipiCalc({
	estadoDestino,
	ncm,
	total,
	ipiDataBase,
}: Props): number {
	if (total === 0 || ncm === '' || estadoDestino === '') {
		return 0;
	}
	try {
		if (estadoDestino === 'AM') return 0;
		const ipiLocalizado = ipiDataBase.filter(
			ipi => ipi.ncm.code.trim() === ncm,
		);
		if (ipiLocalizado.length === 0) return 0;
		return total * (ipiLocalizado[0].percent / 100);
	} catch (e) {
		console.log('Erro no calculo de Ipi:', { e });
		return 0;
	}
}
