import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { CONST } from '~/Constants';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { TFecp } from '~/Model/TFecp';
import { TIcms } from '~/Model/TIcms';
import { TIpi } from '~/Model/TIpi';
import { TItem } from '~/Model/TItem';
import { TMva } from '~/Model/TMva';
import { TNcm } from '~/Model/TNcm';
import { reCalcItem } from '~/Utils/ReCalcItem';
import { FormItem } from '../FormItem';

type Props = {
	calculaSt: TCalculaSt;
	icmsDataBase: TIcms[];
	ipiDataBase: TIpi[];
	mvaDataBase: TMva[];
	ncmDataBase: TNcm[];
	fecpDataBase: TFecp[];
	handleEditItem: (data: TItem, mode: 'edit' | 'delete') => boolean;
	itemForEditId: string;
};

export default function EditItens({
	calculaSt,
	icmsDataBase,
	ipiDataBase,
	mvaDataBase,
	ncmDataBase,
	fecpDataBase,
	handleEditItem,
	itemForEditId,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [itemForEdit, setItemForEdit] = useState<TItem>(CONST.DEFAULT.ITEM);
	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [successDelete, setSuccessDelete] = useState(false);

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
			setSuccessDelete(false);
			setIsLoadingDelete(true);
			setTimeout(() => {
				setSuccessDelete(true);
				setIsLoadingDelete(false);
				setTimeout(() => {
					handleEditItem(itemForEdit, 'delete');
					setSuccessDelete(false);
					setIsOpen(false);
				}, 500);
			}, 2000);
		}
	}

	function calcItem(item: TItem) {
		const itemEditing = reCalcItem({
			calculaSt,
			item,
			icmsDataBase,
			ipiDataBase,
			mvaDataBase,
			fecpDataBase,
		});
		setItemForEdit(itemEditing);
	}

	function handleSelectNcm(data: TNcm) {
		const itemEditing = { ...itemForEdit };
		itemEditing.ncm = { ...data };
		console.log({ itemEditing });
		calcItem({ ...itemEditing }); // Nao tya recalculando verfiicar
	}
	function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { value } = e.target;
		const { name } = e.target;
		const itemEditing = { ...itemForEdit };
		switch (name) {
			case 'quantity':
				itemEditing.quantity = parseFloat(value) || 0;
				break;
			case 'price':
				itemEditing.price = parseFloat(value) || 0;
				break;
			case 'description':
				itemEditing.ncm.description = value;
				break;
			default:
				console.log('Nothing');
		}
		itemEditing.total = itemEditing.price * itemEditing.quantity;
		setItemForEdit(itemEditing);
		calcItem(itemEditing);
	}

	return (
		<div className="flex justify-center">
			<IconButton aria-label="delete" onClick={() => setIsOpen(true)}>
				<VisibilityIcon fontSize="small" />
			</IconButton>

			<FormItem
				handleInput={handleInput}
				handleSelectNcm={handleSelectNcm}
				isLoading={isLoading}
				isLoadingDelete={isLoadingDelete}
				isOpen={isOpen}
				item={itemForEdit}
				mode="update"
				ncmDataBase={ncmDataBase}
				onClose={setIsOpen}
				onDelete={handleDeleteAndConfirm}
				onSave={handleEditAndConfirm}
				success={success}
				successDelete={successDelete}
			/>
		</div>
	);
}
