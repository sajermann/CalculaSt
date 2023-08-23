import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { HeaderConfiguration } from '~/Components/HeaderConfiguration';
import { HeaderInformation } from '~/Components/HeaderInformation';
import { MainItems } from '~/Components/MainItems';
import { CONST } from '~/Constants';
import { useObsDataBase } from '~/Hooks/UseObsDataBase';

import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import { handleCreateItem } from '~/Utils/HandleCreateItem';
import { obsCalc } from '~/Utils/ObsCalc';
import { reCalcHeader } from '~/Utils/ReCalcHeader';

export default function Create() {
	const [calculaSt, setCalculaSt] = useState<TCalculaSt>(
		CONST.DEFAULT.CALCULA_ST,
	);
	const { obsDataBase } = useObsDataBase();

	useEffect(() => {
		setCalculaSt(prev => ({
			...prev,
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		}));
	}, []);

	function handleEditItem(
		itemForEdit: TItem,
		mode: 'edit' | 'delete',
	): boolean {
		const calculaStEditing = { ...calculaSt };
		const itemsForKeep = calculaStEditing.itens.filter(
			itemHere => itemHere.id !== itemForEdit.id,
		);

		if (mode === 'edit')
			calculaStEditing.itens = [...itemsForKeep, itemForEdit];
		if (mode === 'delete') calculaStEditing.itens = [...itemsForKeep];
		calculaStEditing.obs = obsCalc({
			calculaSt: calculaStEditing,
			obsDataBase,
		});
		return reCalcHeader({
			calculaStForRecalc: calculaStEditing,
			setCalculaSt,
		});
	}

	return (
		<Grid container sx={{ padding: 2, gap: 4 }}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<HeaderConfiguration
					calculaSt={calculaSt}
					setCalculaSt={setCalculaSt}
					fecpDataBase={FECP_DB}
					icmsDataBase={ICMS_DB}
					ipiDataBase={IPI_DB}
					mvaDataBase={MVA_DB}
					obsDataBase={OBS_DB}
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<HeaderInformation calculaSt={calculaSt} />
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<MainItems
					items={structuredClone(calculaSt.itens)}
					calculaSt={calculaSt}
					fecpDataBase={FECP_DB}
					icmsDataBase={ICMS_DB}
					ipiDataBase={IPI_DB}
					mvaDataBase={MVA_DB}
					ncmDataBase={NCM_DB}
					handleEditItem={handleEditItem}
					handleAddItem={item =>
						handleCreateItem({
							calculaSt,
							setCalculaSt,
							item,
							obsDataBase: obsDataBase || [],
						})
					}
				/>
			</Grid>
		</Grid>
	);
}
