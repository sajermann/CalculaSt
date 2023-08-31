import { TIcms } from '~/Model/TIcms';

type Props = {
	baseCalculo: number;
	estadoDestino: string;
	icmsDataBase: TIcms[];
};

export function icmsCalc({
	icmsDataBase,
	estadoDestino,
	baseCalculo,
}: Props): number {
	const icmsLocalizado = icmsDataBase.find(
		icms => icms.state.initials === estadoDestino,
	);
	try {
		if (!icmsLocalizado) return 0;
		return baseCalculo * (icmsLocalizado.percent / 100);
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
