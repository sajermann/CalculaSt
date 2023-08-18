import { Grid, Hidden, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddItens } from '~/Components/AddItens';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MoreOptions } from '~/Components/MoreOptions';
import { CONST } from '~/Constants';
import { useDataBase } from '~/Hooks/UseDataBase';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import { customFormat } from '~/Utils/CustomFormat';
import Guid from '~/Utils/GenerateGuid';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

export default function Create() {
	const { FECP_DB, ICMS_DB, IPI_DB, MVA_DB, OBS_DB, NCM_DB } = useDataBase();
	const [calculaSt, setCalculaSt] = useState<TCalculaSt>(
		CONST.DEFAULT.CALCULA_ST,
	);

	useEffect(() => {
		setCalculaSt(prev => ({
			...prev,
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		}));
	}, []);

	function handleAddItem(item: TItem) {
		const itemForAdd = { ...item };
		itemForAdd.id = Guid.new();
		const calculaStEditing = { ...calculaSt };
		calculaStEditing.itens.push(itemForAdd);
		calculaStEditing.obs = obsCalc({
			calculaSt: calculaStEditing,
			obsDataBase: OBS_DB,
		});
		reCalcHeader({
			calculaStForRecalc: calculaStEditing,
			setCalculaSt,
		});
	}

	// function handleEditItem(itemForEdit: Item, mode: 'edit' | 'delete'): boolean {
	// 	const calculaStEditing = { ...calculoSt };
	// 	const itemsForKeep = calculaStEditing.itens.filter(
	// 		itemHere => itemHere.id !== itemForEdit.id,
	// 	);
	// 	if (mode === 'edit')
	// 		calculaStEditing.itens = [...itemsForKeep, itemForEdit];
	// 	if (mode === 'delete') calculaStEditing.itens = [...itemsForKeep];
	// 	calculaStEditing.obs = obsCalc(calculaStEditing);
	// 	return recalcHeader(calculaStEditing);
	// }

	return (
		<div className="border p-5">
			<HeaderConfiguration
				calculaSt={calculaSt}
				setCalculaSt={setCalculaSt}
				fecpDataBase={FECP_DB}
				icmsDataBase={ICMS_DB}
				ipiDataBase={IPI_DB}
				mvaDataBase={MVA_DB}
				obsDataBase={OBS_DB}
			/>

			<HeaderInformation calculaSt={calculaSt} />

			{calculaSt.itens.length > 0 && (
				<Grid container>
					<AddItens
						calculaSt={calculaSt}
						fecpDataBase={FECP_DB}
						icmsDataBase={ICMS_DB}
						ipiDataBase={IPI_DB}
						mvaDataBase={MVA_DB}
						ncmDataBase={NCM_DB}
						handleAddItem={handleAddItem}
						position="right"
					/>

					<MoreOptions />

					<Grid container>
						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							<div>Ação</div>
						</Grid>
						<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
							<div>Descrição</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>N.C.M.</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Quant.</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Preço</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>Total</div>
							</Grid>
						</Grid>
					</Hidden>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>Ipi</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>ST</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={3} sm={3} md={1} lg={1} xl={1}>
							<div>V. Total</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>Acrésc.</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>MVA</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>ICMS</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>Intra</div>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			)}

			{calculaSt.itens.map(item => (
				<Grid container>
					<Grid container>
						<Grid item xs={5} sm={5} md={2} lg={2} xl={2}>
							<div>
								{/* <EditItens
									calculaSt={calculaSt}
									dataBaseIcms={databaseIcms}
									dataBaseIpis={databaseIpi}
									dataBaseMvas={databaseMva}
									dataBaseNcms={databaseNcm}
									dataBaseFecps={databaseFecp}
									handleEditItem={handleEditItem}
									itemForEditId={item.id}
								/> */}
							</div>
						</Grid>
						<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{item.ncm.description}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{item.ncm.code}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.quantity,
											casas: 2,
											cifrao: false,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.price,
											casas: 4,
											cifrao: true,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.total,
											casas: 2,
											cifrao: true,
											porcentagem: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.ipi,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={2} sm={1} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.st,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Grid container>
						<Grid item xs={3} sm={3} md={1} lg={1} xl={1}>
							<div>
								<Typography noWrap style={{ fontSize: 'inherit' }}>
									{customFormat({
										valor: item.valorTotal,
										casas: 2,
										cifrao: true,
										porcentagem: false,
									})}
								</Typography>
							</div>
						</Grid>
					</Grid>

					<Hidden only={['xs', 'sm']}>
						<Grid container>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.acresc,
											casas: 2,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.mvaPorcentagem,
											casas: 2,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.icmsPorcentagem,
											casas: 0,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
								<div>
									<Typography noWrap style={{ fontSize: 'inherit' }}>
										{customFormat({
											valor: item.intraPorcentagem,
											casas: 1,
											porcentagem: true,
											cifrao: false,
										})}
									</Typography>
								</div>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			))}
			{calculaSt.itens.length === 0 && (
				<Grid container direction="column">
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
						<div>
							Clique no ícone
							<AddItens
								calculaSt={calculaSt}
								fecpDataBase={FECP_DB}
								icmsDataBase={ICMS_DB}
								ipiDataBase={IPI_DB}
								mvaDataBase={MVA_DB}
								ncmDataBase={NCM_DB}
								handleAddItem={handleAddItem}
								position="center"
							/>
							para adicionar items
						</div>
					</Grid>
				</Grid>
			)}

			{JSON.stringify({ calculaSt })}
		</div>
	);
}
