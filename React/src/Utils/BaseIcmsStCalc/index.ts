import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TMva } from '~/Model/TMva';

type Props = {
	calculaSt: TCalculaSt;
	total: number;
	ipi: number;
	icms: number;
	ncm: string;
	icmsDataBase: TIcms[];
	mvaDataBase: TMva[];
	fecpDataBase: TFecp[];
};

export function baseIcmsStCalc({
	calculaSt,
	total,
	ipi,
	ncm,
	icms,
	icmsDataBase,
	mvaDataBase,
	fecpDataBase,
}: Props) {
	try {
		if (
			ncm === '' ||
			calculaSt.estadoDestino?.name === '' ||
			calculaSt.estadoDestino === undefined
		)
			return 0;

		if (calculaSt.destinoMercadoria?.name === 'Revenda') {
			const mvaLocalizado = mvaDataBase.find(
				mva =>
					mva.states.find(
						state => state.initials === calculaSt.estadoDestino?.initials,
					) && mva.ncms.find(_ncm => _ncm.code === ncm),
			);
			if (!mvaLocalizado) return 0;
			let result = '';
			if (mvaLocalizado.percent === 0) return 0;
			if (mvaLocalizado.percent > 100) {
				result = `2.${mvaLocalizado.percent.toString().replace('.', '')}`;
			} else {
				result = `1.${mvaLocalizado.percent.toString().replace('.', '')}`;
			}
			return (total + ipi) * parseFloat(result);
		}
		if (
			calculaSt.destinoMercadoria?.name === 'Consumo' &&
			calculaSt.tipoCalculo?.name === 'Fora' &&
			calculaSt.clienteContribuinte
		) {
			return total + ipi;
		}
		if (
			calculaSt.destinoMercadoria?.name === 'Consumo' &&
			(calculaSt.tipoCalculo?.name === 'Dentro' ||
				calculaSt.tipoCalculo?.name === 'BS Dupla') &&
			calculaSt.clienteContribuinte
		) {
			let fecpLocalized = fecpDataBase.find(
				item => item.state.initials === calculaSt.estadoDestino?.initials,
			);
			if (!fecpLocalized) {
				fecpLocalized = {
					id: '',
					percent: 0,
					state: { id: '', initials: '', name: '' },
				};
			}

			const icmsIntraLocalizado = icmsDataBase.filter(
				el => el.state.initials === calculaSt.estadoDestino?.initials,
			);
			let result = '';
			if (icmsIntraLocalizado[0].percentIntra + fecpLocalized.percent < 10) {
				result = `0.0${(
					icmsIntraLocalizado[0].percentIntra + fecpLocalized.percent
				)
					.toString()
					.replace('.', '')}`;
			} else {
				result = `0.${(
					icmsIntraLocalizado[0].percentIntra + fecpLocalized.percent
				)
					.toString()
					.replace('.', '')}`;
			}
			const finalResult = (100 - parseFloat(result) * 100) / 100;

			return (total + ipi - icms) / finalResult;
		}
		return 0;
	} catch (e) {
		console.log('Erro no Base Icms St:', { e });
		return 0;
	}
}
