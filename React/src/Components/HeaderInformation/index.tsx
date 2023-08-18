import { Grid, Hidden } from '@mui/material';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { customFormat } from '~/Utils/CustomFormat';

type Props = {
	calculaSt: TCalculaSt;
};
export function HeaderInformation({ calculaSt }: Props) {
	return (
		<Grid container spacing={1}>
			<Grid
				item
				xs={12}
				sm={4}
				md={4}
				lg={2}
				xl={2}
				display="flex"
				flexDirection="column"
				gap={0.5}
			>
				<span>Base de Cál</span>

				<span>
					{customFormat({
						valor: calculaSt.baseDeCalculo,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</span>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<div>Icms</div>
				<div>
					{customFormat({
						valor: calculaSt.icms,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<div>Base Icms ST</div>
				<div>
					{customFormat({
						valor: calculaSt.baseIcmsSt,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<div>St</div>
				<div>
					{customFormat({
						valor: calculaSt.st,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<div>Total</div>
				<div>
					{customFormat({
						valor: calculaSt.total,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Hidden only={['sm', 'md']}>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<div>Fecp</div>
					<div>
						{customFormat({
							valor: calculaSt.fecp,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					</div>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<div>Pis</div>
				<div>
					{customFormat({
						valor: calculaSt.pis,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<div>Cofins</div>
				<div>
					{customFormat({
						valor: calculaSt.cofins,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<div>Ipi</div>
				<div>
					{customFormat({
						valor: calculaSt.ipi,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<div>Total Geral</div>
				<div>
					{customFormat({
						valor: calculaSt.totalGeral,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				</div>
			</Grid>
			{calculaSt.obs.length > 0 && (
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<div>OBS</div>
					<div>{calculaSt.obs}</div>
				</Grid>
			)}
		</Grid>
	);
}
