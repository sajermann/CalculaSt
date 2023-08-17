import { TIcms } from '~/Model/TIcms';

type Props = {
	estadoDestino: string;
	icmsDataBase: TIcms[];
};

export function intraPorcentagemCalc({
	estadoDestino,
	icmsDataBase,
}: Props): number {
	try {
		const icmsLocalizado = icmsDataBase.find(
			icms => icms.state.initials === estadoDestino,
		);
		if (!icmsLocalizado) return 0;
		return icmsLocalizado.percentIntra;
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
