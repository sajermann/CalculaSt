import { TCalculaSt } from '~/Model/TCalculaSt';
import { TObs } from '~/Model/TObs';

import { customFormat } from '../CustomFormat';

type Props = {
	calculaSt: TCalculaSt;
	obsDataBase: TObs[];
};

export function obsCalc({ calculaSt, obsDataBase }: Props): string {
	let difalTemp = 0;
	for (const item of calculaSt.itens) {
		difalTemp = item.difal + difalTemp;
	}

	const difalTempFormat = customFormat({
		valor: difalTemp,
		casas: 2,
		cifrao: true,
		porcentagem: false,
	});

	let fecpTemp = 0;
	for (const item of calculaSt.itens) {
		fecpTemp = item.fecp + fecpTemp;
	}

	const fecpTempFormat = customFormat({
		valor: fecpTemp,
		casas: 2,
		cifrao: true,
		porcentagem: false,
	});

	const obsLocalizada = obsDataBase.filter(
		obsHere =>
			obsHere.estado === calculaSt.estadoDestino?.initials &&
			obsHere.destino === calculaSt.destinoMercadoria?.name &&
			obsHere.tipo === calculaSt.tipoCalculo?.name &&
			obsHere.simplesNacional === calculaSt.simplesNacional &&
			obsHere.contribuinte === calculaSt.clienteContribuinte,
	);
	let obsMontada = '';
	try {
		if (obsLocalizada[0].protocolo !== '') {
			obsMontada = `Protocolo do estado: ${obsLocalizada[0].protocolo}`;
		}
		if (obsLocalizada[0].obs !== '') {
			obsMontada = `${obsMontada} Observação: ${obsLocalizada[0].obs}`;
		}
		if (
			calculaSt.estadoDestino?.initials === 'RJ' &&
			(!Number.isNaN(fecpTempFormat) || parseFloat(fecpTempFormat) !== 0.0)
		) {
			obsMontada = `${obsMontada} ${fecpTempFormat}`;
		}
		if (!calculaSt.clienteContribuinte) {
			obsMontada = `${obsMontada}. Difal: R$ ${difalTempFormat}`;
		}
	} catch (e) {
		console.log({ e });
		return 'Erro';
	}
	return obsMontada;
}
