import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';

type Props = {
	calculaSt: TCalculaSt;
	baseIcmsSt: number;
	fecpDataBase: TFecp[];
};

export function fecpCalc({
	baseIcmsSt,
	calculaSt,
	fecpDataBase,
}: Props): number {
	try {
		if (
			calculaSt.estadoDestino?.initials === '' ||
			calculaSt.destinoMercadoria?.name === ''
		)
			return 0;

		let fecpLocalized = fecpDataBase.find(
			fecp => fecp.state.initials === calculaSt.estadoDestino?.initials,
		);

		if (!fecpLocalized) {
			fecpLocalized = {
				id: '',
				percent: 0,
				state: { id: '', initials: '', name: '' },
			};
		}

		if (
			calculaSt.destinoMercadoria?.name === 'Revenda' ||
			calculaSt.destinoMercadoria?.name === 'Consumo'
		) {
			return baseIcmsSt * (fecpLocalized.percent / 100);
		}

		return 0;
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
