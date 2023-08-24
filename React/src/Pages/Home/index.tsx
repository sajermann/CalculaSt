import Button from '@mui/material/Button';
import { useObsDataBase } from '~/Hooks/UseObsDataBase';
import { useTranslation } from '~/Hooks/UseTranslation';

export default function Home() {
	const { translate } = useTranslation();
	const { obsDataBase } = useObsDataBase();

	console.log({ obsDataBase });

	return (
		<div>
			<h1>
				{translate('WELCOME_TO_VITE_BOILERPLATE')} - {translate('TODO_LIST')}
			</h1>
			<Button variant="contained">Hello world</Button>
		</div>
	);
}
