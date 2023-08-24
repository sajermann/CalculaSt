import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CONST } from '~/Constants';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useFecpDataBase } from '~/Hooks/UseFecpDataBase';
import { useIcmsDataBase } from '~/Hooks/UseIcmsDataBase';
import { useIpiDataBase } from '~/Hooks/UseIpiDataBase';
import { useMvaDataBase } from '~/Hooks/UseMvaDataBase';
import { useNcmDataBase } from '~/Hooks/UseNcmDataBase';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TItem } from '~/Model/TItem';
import { handleInput } from '~/Utils/HandleInput';
import { handleSaveItem } from '~/Utils/HandleSaveItem';
import { handleSelectNcm } from '~/Utils/HandleSelectNcm';
import { FormItem } from '../FormItem';

type Props = {
	handleCreateItem: (data: TItem) => void;
};

export function CreateItem({ handleCreateItem }: Props) {
	const { calculaSt } = useCalculaSt();
	const { fecpDataBase } = useFecpDataBase();
	const { icmsDataBase } = useIcmsDataBase();
	const { ipiDataBase } = useIpiDataBase();
	const { mvaDataBase } = useMvaDataBase();
	const { ncmDataBase } = useNcmDataBase();
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [itemForAdd, setItemForAdd] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				aria-label="add"
				disabled={
					!calculaSt.destinoMercadoria ||
					!calculaSt.estadoDestino ||
					!calculaSt.destinoMercadoria.name ||
					!calculaSt.estadoDestino.initials
				}
				onClick={() => setIsOpen(true)}
			>
				<AddIcon /> {translate('CREATE_ITEM')}
			</Button>

			<FormItem
				handleInput={e =>
					handleInput({
						calculaSt,
						eventInput: e,
						fecpDataBase,
						icmsDataBase,
						ipiDataBase,
						item: itemForAdd,
						mvaDataBase,
						ncmDataBase,
						setItem: setItemForAdd,
					})
				}
				handleSelectNcm={e =>
					handleSelectNcm({
						item: itemForAdd,
						ncm: e,
						setItem: setItemForAdd,
						calculaSt,
						fecpDataBase,
						icmsDataBase,
						ipiDataBase,
						mvaDataBase,
						ncmDataBase,
					})
				}
				isLoading={isLoading}
				isOpen={isOpen}
				item={itemForAdd}
				mode="create"
				ncmDataBase={ncmDataBase}
				onClose={setIsOpen}
				onSave={() =>
					handleSaveItem({
						handleAddItem: handleCreateItem,
						handleResetInfos: () => setItemForAdd(CONST.DEFAULT.ITEM),
						isLoading,
						item: itemForAdd,
						setIsOpen,
						setLoading,
						setSuccess,
					})
				}
				success={success}
			/>
		</div>
	);
}
