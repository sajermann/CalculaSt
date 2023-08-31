import { TCalculaSt } from '~/Model/TCalculaSt';

type Props = {
	calculaSt: TCalculaSt;
	dataForVerify:
		| 'destinoMercadoria'
		| 'tipoCalculo'
		| 'clienteContribuinte'
		| 'simplesNacional';
};

export function mustDisabled({ calculaSt, dataForVerify }: Props): boolean {
	const CONFIG = {
		destinoMercadoria: () => calculaSt.estadoDestino?.initials === 'SP',
		tipoCalculo: () =>
			(calculaSt.destinoMercadoria?.name === 'Consumo' &&
				!calculaSt.clienteContribuinte) ||
			calculaSt.destinoMercadoria?.name === 'Revenda',
		clienteContribuinte: () => calculaSt.destinoMercadoria?.name === 'Revenda',
		simplesNacional: () =>
			calculaSt.destinoMercadoria?.name === 'Consumo' ||
			calculaSt.estadoDestino?.initials === 'SP',
	};

	return CONFIG[dataForVerify]();
}
