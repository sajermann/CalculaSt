import zukeeper from 'zukeeper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TCalculaSt } from '~/Model/TCalculaSt';

function deleteSimulation(
	simulations: TCalculaSt[],
	simulationToDelete: TCalculaSt,
) {
	const newSimulations: TCalculaSt[] = [];
	[...simulations].forEach(simulation => {
		if (simulation?.id !== simulationToDelete?.id) {
			newSimulations.push({ ...simulation });
		}
	});
	return [...newSimulations];
}

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

export const useSimulations = create<Props>()(
	persist(
		zukeeper((set: SetProps) => ({
			simulations: [],

			createSimulation: (data: TCalculaSt) => {
				set(state => ({
					...state,
					simulations: [...state.simulations, { ...data }],
				}));
				return true;
			},

			updateSimulation: (simulationToSave: TCalculaSt) => {
				set(state => ({
					...state,
					simulations: [...state.simulations].map(simulation => {
						if (simulation?.id === simulationToSave?.id) {
							return { ...simulationToSave };
						}
						return { ...simulation };
					}),
				}));
				return true;
			},

			deleteSimulation: (simulationToDelete: TCalculaSt) => {
				set(state => ({
					...state,
					simulations: deleteSimulation(state.simulations, simulationToDelete),
				}));
				return true;
			},
		})),
		{
			name: '@calcula-st:simulations',
		},
	),
);
window.store = useSimulations;
