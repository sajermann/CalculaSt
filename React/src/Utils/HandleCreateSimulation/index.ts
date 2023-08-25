import { TCalculaSt } from '~/Model/TCalculaSt';
import Guid from '../GenerateGuid';

type Props = {
	calculaSt: TCalculaSt;
	title: string;
	setCalculaSt: (data: TCalculaSt) => void;
	createSimulation: (data: TCalculaSt) => void;
};
export function handleCreateSimulation({
	calculaSt,
	setCalculaSt,
	title,
	createSimulation,
}: Props) {
	const newCalculaSt: TCalculaSt = { ...calculaSt, id: Guid.new(), title };
	setCalculaSt({ ...newCalculaSt });
	createSimulation({ ...newCalculaSt });
}
