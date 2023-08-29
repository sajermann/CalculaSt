import { delay } from '@sajermann/utils/Delay';

type Props = {
	isLoading: boolean;
	setSuccess: (data: boolean) => void;
	setLoading: (data: boolean) => void;
	setIsOpen: (data: boolean) => void;
	onFinalize: () => void;
};

export async function handleSimulateFetch({
	isLoading,
	setSuccess,
	setLoading,
	onFinalize,
	setIsOpen,
}: Props) {
	if (isLoading) return;
	setSuccess(false);
	setLoading(true);
	await delay(2000);
	setSuccess(true);
	setLoading(false);
	await delay(500);
	onFinalize();
	setSuccess(false);
	setIsOpen(false);
}
