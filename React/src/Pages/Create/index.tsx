import { useEffect, useState } from 'react';
import { SelectBrazilState } from '~/Components/SelectBrazilState';
import { CONST } from '~/Constants';
import { useDataBase } from '~/Hooks/UseDataBase';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TBrazilState } from '~/Model/TBrazilState';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { reCalcAll } from '~/Utils/ReCalcAll';

export default function Create() {
	const { translate } = useTranslation();
	const { BRAZIL_STATES_DB, FECP_DB, ICMS_DB } = useDataBase();
	const [calculaSt, setCalculaSt] = useState<TCalculaSt>(
		CONST.DEFAULT.CALCULA_ST,
	);

	useEffect(() => {
		setCalculaSt(prev => ({
			...prev,
			estadoOrigem: { id: '', initials: 'SP', name: 'São Paulo' },
		}));
	}, []);

	function handleBrazilStateOrigin(e: TBrazilState) {
		const calc = { ...calculaSt };
		if (Object.getOwnPropertyNames(e)) {
			calc.estadoOrigem = { ...e };
		} else {
			calc.estadoOrigem = { id: '', initials: '', name: '' };
		}
		reCalcAll({
			calculaStForRecalcAll: calc,
			fecpDataBase: FECP_DB,
			icmsDataBase: ICMS_DB,
			ipiDataBase,
			mvaDataBase,
			obsDataBase,
			setCalculaSt,
		});
	}

	return (
		<div>
			<SelectBrazilState
				states={[...BRAZIL_STATES_DB]}
				label={translate('FROM')}
				handleBrazilState={handleBrazilStateOrigin}
				value={calculaSt.estadoOrigem}
				disabled
			/>
			Olá
		</div>
	);
}
