import zukeeper from 'zukeeper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TCalculaSt } from '~/Model/TCalculaSt';

interface Props {
	simulations: TCalculaSt[];
	createSimulation: (data: TCalculaSt) => boolean;
	updateSimulation: (data: TCalculaSt) => boolean;
	deleteSimulation: (data: TCalculaSt) => boolean;
}
type SetProps = (
	partial: Props | Partial<Props> | ((state: Props) => Props | Partial<Props>),
	replace?: boolean | undefined,
) => void;

export const useDarkMode = create<Props>()(
	persist(
		zukeeper((set: SetProps) => ({
			simulations: [],
			createSimulation: (data: TCalculaSt) => {
				set(state => ({
					...state,
					createSimulation: [],
				}));
				return true;
			},
		})),
		{
			name: '@calcula-st:simulations', // name of the item in the storage (must be unique)
		},
	),
);
window.store = useDarkMode;
