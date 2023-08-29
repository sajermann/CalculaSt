import { TCalculaSt } from '~/Model/TCalculaSt';
import Guid from '../GenerateGuid';

type Props = {
	calculaSt: TCalculaSt;
	title: string;
	setCalculaSt: (data: TCalculaSt) => void;
	createSimulation: (data: TCalculaSt) => void;
	navigation: (id: string) => void;
};
export function handleCreateSimulation({
	calculaSt,
	setCalculaSt,
	title,
	createSimulation,
	navigation,
}: Props) {
	const id = Guid.new();
	const newCalculaSt: TCalculaSt = { ...calculaSt, id, title };
	setCalculaSt({ ...newCalculaSt });
	createSimulation({ ...newCalculaSt });
	navigation(id);
}
