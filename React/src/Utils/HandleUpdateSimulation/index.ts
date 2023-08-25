import { TCalculaSt } from '~/Model/TCalculaSt';

type Props = {
	calculaSt: TCalculaSt;
	updateSimulation: (data: TCalculaSt) => void;
};
export function handleUpdateSimulation({ calculaSt, updateSimulation }: Props) {
	updateSimulation({ ...calculaSt });
}
