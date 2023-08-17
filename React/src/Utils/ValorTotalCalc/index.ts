import { TCalculaSt } from '~/Model/TCalculaSt';

type Props = {
	calculaSt: TCalculaSt;
	total: number;
	ipi: number;
	st: number;
	fecp: number;
};

export function valorTotalCalc({
	total,
	ipi,
	st,
	fecp,
	calculaSt,
}: Props): number {
	if (
		calculaSt.estadoDestino.initials === 'RJ' &&
		calculaSt.clienteContribuinte
	) {
		return total + ipi + st + fecp;
	}
	return total + ipi + st;
}
