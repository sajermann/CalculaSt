import { TCalculaSt } from '~/Model/TCalculaSt';
import { TIcms } from '~/Model/TIcms';
import { difalCalc } from '../DifalCalc';

type Props = {
	calculaSt: TCalculaSt;
	icms: number;
	baseIcmsSt: number;
	baseCalculo: number;
	ipi: number;
	total: number;
	icmsDataBase: TIcms[];
};

export function stCalc({
	calculaSt,
	icms,
	baseIcmsSt,
	baseCalculo,
	ipi,
	total,
	icmsDataBase,
}: Props): number {
	try {
		if (
			icms === undefined ||
			baseIcmsSt === undefined ||
			baseCalculo === undefined ||
			ipi === undefined ||
			total === undefined
		) {
			return 0;
		}
		const aliquotasLocalizado = icmsDataBase.find(
			el => el.state.initials === calculaSt.estadoDestino.initials,
		);
		if (!aliquotasLocalizado) return 0;
		const porcentagemIntraLocalizado = aliquotasLocalizado.percentIntra;
		const porcentagemIcmsLocalizado = aliquotasLocalizado.percent;
		if (
			calculaSt.destinoMercadoria.name === 'Revenda' &&
			!calculaSt.simplesNacional
		) {
			if (baseIcmsSt === 0) {
				return 0;
			}
			return baseIcmsSt * (porcentagemIntraLocalizado / 100) - icms;
		}

		if (
			calculaSt.destinoMercadoria.name === 'Revenda' &&
			calculaSt.simplesNacional &&
			calculaSt.estadoDestino.initials === 'PR'
		) {
			return baseIcmsSt * (porcentagemIntraLocalizado / 100) - icms;
		}
		if (
			calculaSt.destinoMercadoria.name === 'Consumo' &&
			calculaSt.tipoCalculo.name === 'Fora' &&
			calculaSt.clienteContribuinte
		) {
			return difalCalc({
				icmsDataBase,
				estadoDestino: calculaSt.estadoDestino.initials,
				total,
				ipi,
			});
		}
		if (
			calculaSt.destinoMercadoria.name === 'Consumo' &&
			calculaSt.tipoCalculo.name === 'Dentro' &&
			calculaSt.clienteContribuinte
		) {
			return baseIcmsSt * (porcentagemIntraLocalizado / 100) - icms;
		}
		if (
			calculaSt.destinoMercadoria.name === 'Consumo' &&
			calculaSt.tipoCalculo.name === 'BS Dupla' &&
			calculaSt.clienteContribuinte
		) {
			return (
				baseIcmsSt *
				(porcentagemIntraLocalizado / 100 - porcentagemIcmsLocalizado / 100)
			);
		}
		return 0;
	} catch (e) {
		console.log({ e });
		return 0;
	}
}
