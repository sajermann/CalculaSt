import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { CONST } from '~/Constants';
import { useFecpDataBase } from '~/Hooks/UseFecpDataBase';
import { useIcmsDataBase } from '~/Hooks/UseIcmsDataBase';
import { useIpiDataBase } from '~/Hooks/UseIpiDataBase';
import { useMvaDataBase } from '~/Hooks/UseMvaDataBase';
import { useNcmDataBase } from '~/Hooks/UseNcmDataBase';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TItem } from '~/Model/TItem';
import { handleInput } from '~/Utils/HandleInput';
import { handleSelectNcm } from '~/Utils/HandleSelectNcm';
import { FormItem } from '../FormItem';

type Props = {
	calculaSt: TCalculaSt;

	handleEditItem: (data: TItem, mode: 'edit' | 'delete') => boolean;
	itemForEditId: string;
};

export function UpdateItem({
	calculaSt,

	handleEditItem,
	itemForEditId,
}: Props) {
	const { fecpDataBase } = useFecpDataBase();
	const { icmsDataBase } = useIcmsDataBase();
	const { ipiDataBase } = useIpiDataBase();
	const { mvaDataBase } = useMvaDataBase();
	const { ncmDataBase } = useNcmDataBase();
	const [isOpen, setIsOpen] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [isSuccessDelete, setIsSuccessDelete] = useState(false);

	useEffect(() => {
		const itemSearch = calculaSt.itens.find(item => item.id === itemForEditId);
		if (!itemSearch) {
			return;
		}
		console.log({ itemSearch });
		setItemForEdit({ ...itemSearch });
	}, [itemForEditId]);

	function handleEditAndConfirm() {
		if (isLoading) return;
		setSuccess(false);
		setLoading(true);

		setTimeout(() => {
			setSuccess(true);
			setLoading(false);
			setTimeout(() => {
				handleEditItem(itemForEdit, 'edit');
				setSuccess(false);
				setIsOpen(false);
			}, 500);
		}, 2000);
	}
	function handleDeleteAndConfirm() {
		if (!isLoadingDelete) {
			setIsSuccessDelete(false);
			setIsLoadingDelete(true);
			setTimeout(() => {
				setIsSuccessDelete(true);
				setIsLoadingDelete(false);
				setTimeout(() => {
					handleEditItem(itemForEdit, 'delete');
					setIsSuccessDelete(false);
					setIsOpen(false);
				}, 500);
			}, 2000);
		}
	}

	return (
		<div className="flex justify-center">
			<IconButton aria-label="delete" onClick={() => setIsOpen(true)}>
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
						ncmDataBase,
					})
				}
				isLoading={isLoading}
				isOpen={isOpen}
				item={itemForEdit}
				mode="update"
				ncmDataBase={ncmDataBase}
				onClose={setIsOpen}
				onSave={handleEditAndConfirm}
				success={success}
				deleteOptions={{
					isLoading: isLoadingDelete,
					isSuccess: isSuccessDelete,
					onDelete: handleDeleteAndConfirm,
				}}
			/>
		</div>
	);
}
