import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TCalculaSt } from '~/Model/TCalculaSt';

function deleteSimulationInternal(
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
	getSimulation: (data?: string) => TCalculaSt | undefined;
	createSimulation: (data: TCalculaSt) => boolean;
	updateSimulation: (data: TCalculaSt) => boolean;
	deleteSimulation: (data: TCalculaSt) => boolean;
}

export const useSimulations = create<Props>()(
	persist(
		(set, get) => ({
			simulations: [],

			getSimulation: (id?: string) => {
				const tt = get().simulations.find(simulation => simulation.id === id);
				console.log({ tt });
				return tt;
			},

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
					simulations: deleteSimulationInternal(
						state.simulations,
						simulationToDelete,
					),
				}));
				return true;
			},
		}),
		{
			name: '@calcula-st:simulations',
		},
	),
);
