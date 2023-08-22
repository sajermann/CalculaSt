import { Grid, Hidden } from '@mui/material';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { customFormat } from '~/Utils/CustomFormat';

function Card({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1 border-b">
			<span className="font-normal text-sm">{label}</span>

			<span>{value}</span>
		</div>
	);
}

type Props = {
	calculaSt: TCalculaSt;
};
export function HeaderInformation({ calculaSt }: Props) {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<Card
					label="Base de Cál"
					value={customFormat({
						valor: calculaSt.baseDeCalculo,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<Card
					label="Icms"
					value={customFormat({
						valor: calculaSt.icms,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<Card
					label="Base Icms ST"
					value={customFormat({
						valor: calculaSt.baseIcmsSt,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<Card
					label="St"
					value={customFormat({
						valor: calculaSt.st,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<Card
					label="Total"
					value={customFormat({
						valor: calculaSt.total,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Hidden only={['sm', 'md']}>
				<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
					<Card
						label="Fecp"
						value={customFormat({
							valor: calculaSt.fecp,
							casas: 2,
							cifrao: false,
							porcentagem: false,
						})}
					/>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<Card
					label="Pis"
					value={customFormat({
						valor: calculaSt.pis,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<Card
					label="Cofins"
					value={customFormat({
						valor: calculaSt.cofins,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
				<Card
					label="Ipi"
					value={customFormat({
						valor: calculaSt.ipi,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
				<Card
					label="Total Geral"
					value={customFormat({
						valor: calculaSt.totalGeral,
						casas: 2,
						cifrao: false,
						porcentagem: false,
					})}
				/>
			</Grid>
			{calculaSt.obs.length > 0 && (
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Card label="OBS" value={calculaSt.obs} />
				</Grid>
			)}
		</Grid>
	);
}
