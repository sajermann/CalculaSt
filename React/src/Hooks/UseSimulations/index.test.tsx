/* eslint-disable react/button-has-type */
/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';
import { TCalculaSt } from '~/Model/TCalculaSt';
import { useSimulations } from '.';

const id = 'Test_Create_Simulation';

function Mock() {
	const {
		getSimulation,
		createSimulation,
		updateSimulation,
		deleteSimulation,
	} = useSimulations();
	const [selectedSimulation, setSelectedSimulation] = useState<TCalculaSt>();

	function getSimu() {
		setSelectedSimulation(getSimulation(id));
	}

	function createSimu() {
		createSimulation({ id, title: 'Title_Test' } as TCalculaSt);
		createSimulation({ id: 'random', title: 'Random' } as TCalculaSt);
	}

	function updateSimu() {
		updateSimulation({ id, title: 'My_Title_Was_Updated' } as TCalculaSt);
		getSimu();
	}

	function deleteSimu() {
		deleteSimulation({ id } as TCalculaSt);
		getSimu();
	}
	return (
		<div>
			<button onClick={getSimu}>Get Simulation</button>
			<button onClick={createSimu}>Create Simulation</button>
			<button onClick={updateSimu}>Update Simulation</button>
			<button onClick={deleteSimu}>Delete Simulation</button>
			<span>{JSON.stringify(selectedSimulation)}</span>
		</div>
	);
}

describe('Hooks/useSimulations', () => {
	it(`should test all paths`, async () => {
		const { getByText, queryByText } = render(<Mock />);
		fireEvent.click(getByText('Create Simulation'));
		fireEvent.click(getByText('Get Simulation'));
		expect(getByText(/Title_Test/i)).toBeInTheDocument();

		fireEvent.click(getByText('Update Simulation'));
		expect(queryByText(/Title_Test/i)).toBeNull();
		expect(getByText(/My_Title_Was_Updated/i)).toBeInTheDocument();

		fireEvent.click(getByText('Delete Simulation'));
		expect(queryByText(/My_Title_Was_Updated/i)).toBeNull();
	});
});
