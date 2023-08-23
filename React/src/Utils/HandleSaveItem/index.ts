import { TItem } from '~/Model/TItem';

type Props = {
	item: TItem;
	isLoading: boolean;
	setSuccess: (data: boolean) => void;
	setLoading: (data: boolean) => void;
	setIsOpen: (data: boolean) => void;
	handleAddItem: (data: TItem) => void;
	handleResetInfos: () => void;
};

export function handleSaveItem({
	isLoading,
	setSuccess,
	setLoading,
	handleAddItem,
	item,
	handleResetInfos,
	setIsOpen,
}: Props) {
	if (!isLoading) {
		setSuccess(false);
		setLoading(true);
		setTimeout(() => {
			setSuccess(true);
			setLoading(false);
			setTimeout(() => {
				handleAddItem(item);
				setSuccess(false);
				handleResetInfos();
				setIsOpen(false);
			}, 500);
		}, 2000);
	}
}
