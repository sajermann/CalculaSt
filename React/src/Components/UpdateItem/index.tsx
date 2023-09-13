import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { CONST } from '~/Constants';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useDataBase } from '~/Hooks/UseDataBase';
import { TItem } from '~/Model/TItem';
import { handleInput } from '~/Utils/HandleInput';
import { handleSaveItem } from '~/Utils/HandleSaveItem';
import { handleSelectNcm } from '~/Utils/HandleSelectNcm';
import { handleUpdateItem } from '~/Utils/HandleUpdateItem';
import { FormItem } from '../FormItem';

type Props = {
	itemForEditId: string;
};

export function UpdateItem({ itemForEditId }: Props) {
	const { calculaSt, setCalculaSt } = useCalculaSt();
	const {
		fecpDataBase,
		icmsDataBase,
		ipiDataBase,
		mvaDataBase,
		ncmDataBase,
		obsDataBase,
	} = useDataBase();
	const [isOpen, setIsOpen] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [isSuccessDelete, setIsSuccessDelete] = useState(false);

	useEffect(() => {
		const itemSearch = calculaSt.itens.find(item => item.id === itemForEditId);
		if (!itemSearch) {
			return;
		}

		setItemForEdit({ ...itemSearch });
	}, [itemForEditId]);

	return (
		<div className="flex justify-center">
			<IconButton
				data-testid="update-item-button"
				aria-label="update item button"
				onClick={() => setIsOpen(true)}
			>
				<VisibilityIcon fontSize="small" />
			</IconButton>

			<FormItem
				handleInput={e =>
					handleInput({
						calculaSt,
						eventInput: e,
						fecpDataBase,
						icmsDataBase,
						ipiDataBase,
						item: itemForEdit,
						mvaDataBase,
						ncmDataBase,
						setItem: setItemForEdit,
					})
				}
				handleSelectNcm={e =>
					handleSelectNcm({
						item: itemForEdit,
						ncm: e,
						setItem: setItemForEdit,
						calculaSt,
						fecpDataBase,
						icmsDataBase,
						ipiDataBase,
						mvaDataBase,
					})
				}
				isLoading={isLoadingUpdate}
				isOpen={isOpen}
				item={itemForEdit}
				mode="update"
				ncmDataBase={ncmDataBase}
				onClose={setIsOpen}
				onSave={() =>
					handleSaveItem({
						isLoading: isLoadingUpdate,
						setSuccess: setIsSuccessUpdate,
						setLoading: setIsLoadingUpdate,
						onFinalize: () =>
							handleUpdateItem({
								item: itemForEdit,
								calculaSt,
								setCalculaSt,
								mode: 'edit',
								obsDataBase,
							}),
						setIsOpen,
					})
				}
				success={isSuccessUpdate}
				deleteOptions={{
					isLoading: isLoadingDelete,
					isSuccess: isSuccessDelete,
					onDelete: () =>
						handleSaveItem({
							isLoading: isLoadingDelete,
							setSuccess: setIsSuccessDelete,
							setLoading: setIsLoadingDelete,
							onFinalize: () =>
								handleUpdateItem({
									item: itemForEdit,
									calculaSt,
									setCalculaSt,
									mode: 'delete',
									obsDataBase,
								}),
							setIsOpen,
						}),
				}}
			/>
		</div>
	);
}
