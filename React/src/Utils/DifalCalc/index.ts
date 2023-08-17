import { TIcms } from '~/Model/TIcms';

type Props = {
	icmsDataBase: TIcms[];
	estadoDestino: string;
	total: number;
	ipi: number;
};

export function difalCalc({
	icmsDataBase,
	estadoDestino,
	total,
	ipi,
}: Props): number {
	try {
		const aliquotasLocalizado = icmsDataBase.filter(
			el => el.state.initials === estadoDestino,
		);
		const porcentagemIntraLocalizado = aliquotasLocalizado[0].percentIntra;

		const porcentagemIcmsLocalizado = aliquotasLocalizado[0].percent;
		const difal =
			(total + ipi) *
			(porcentagemIntraLocalizado / 100 - porcentagemIcmsLocalizado / 100);
		return difal;
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
