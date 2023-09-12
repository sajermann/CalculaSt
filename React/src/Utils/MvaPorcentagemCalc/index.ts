import { TCalculaSt } from '~/Model/TCalculaSt';
import { TMva } from '~/Model/TMva';

type Props = {
	calculaSt: TCalculaSt;
	mvaDataBase: TMva[];
	ncm: string;
};

export function mvaPorcentagemCalc({
	calculaSt,
	ncm,
	mvaDataBase,
}: Props): number {
	try {
		if (
			!ncm ||
			!calculaSt.estadoDestino?.initials ||
			calculaSt.destinoMercadoria?.name !== 'Revenda'
		) {
			return 0;
		}

		const mvaLocalizado = mvaDataBase.find(
			mva =>
				mva.states.find(
					state => state.initials === calculaSt.estadoDestino?.initials,
				) && mva.ncms.find(ncmHere => ncmHere.code === ncm),
		);
		if (!mvaLocalizado) return 0;
		return mvaLocalizado.percent;
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
