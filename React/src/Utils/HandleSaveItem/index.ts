type Props = {
	isLoading: boolean;
	setSuccess: (data: boolean) => void;
	setLoading: (data: boolean) => void;
	setIsOpen: (data: boolean) => void;
	onFinalize: () => void;
	handleResetInfos?: () => void;
};

export function handleSaveItem({
	isLoading,
	setSuccess,
	setLoading,
	onFinalize,

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
				onFinalize();
				setSuccess(false);
				if (handleResetInfos) handleResetInfos();
				setIsOpen(false);
			}, 500);
		}, 2000);
	}
}
