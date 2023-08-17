import { TCalculaSt } from '~/Model/TCalculaSt';
import { TObs } from '~/Model/TObs';

import { customFormat } from '../CustomFormat';

type Props = {
	calculaSt: TCalculaSt;
	obsDataBase: TObs[];
};

export function obsCalc({ calculaSt, obsDataBase }: Props): string {
	let difalTemp = 0;
	for (let i = 0; i < calculaSt.itens.length; i += 1) {
		difalTemp = calculaSt.itens[i].difal + difalTemp;
	}

	const difalTempFormat = customFormat({
		valor: difalTemp,
		casas: 2,
		cifrao: true,
		porcentagem: false,
	});

	let fecpTemp = 0;
	for (let j = 0; j < calculaSt.itens.length; j += 1) {
		fecpTemp = calculaSt.itens[j].fecp + fecpTemp;
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
		if (obsLocalizada[0].tipoClienteSiga !== '') {
			obsMontada = `${obsMontada}. Tipo Cliente: ${obsLocalizada[0].tipoClienteSiga}`;
		}
		if (obsLocalizada[0].grupoClienteSiga !== '') {
			obsMontada = `${obsMontada}. Grupo Tributário: ${obsLocalizada[0].grupoClienteSiga}`;
		}
		if (obsLocalizada[0].formula !== '') {
			obsMontada = `${obsMontada}. Fórmula: ${obsLocalizada[0].formula}`;
		}
		if (obsLocalizada[0].tesSIpi !== '') {
			obsMontada = `${obsMontada},. Tes Sem Ipi: ${obsLocalizada[0].tesSIpi}`;
		}
		if (obsLocalizada[0].tesCIpi !== '') {
			obsMontada = `${obsMontada}. Tes Com Ipi: ${obsLocalizada[0].tesCIpi}`;
		}
		if (obsLocalizada[0].cfop !== '') {
			obsMontada = `${obsMontada}. CFOP: ${obsLocalizada[0].cfop}`;
		}
		if (obsLocalizada[0].danfeConferida !== '') {
			obsMontada = `${obsMontada}. Danfe Conferida: ${obsLocalizada[0].danfeConferida}`;
		}
		if (obsLocalizada[0].complementoObs !== '') {
			obsMontada = `${obsMontada}. ${obsLocalizada[0].complementoObs}`;
		}
	} catch (e) {
		console.log({ e });
		return 'Erro';
	}
	return obsMontada;
}
