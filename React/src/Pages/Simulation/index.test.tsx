/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { InjectorProviders } from '~/Components/InjectorProviders';
import { Simulation } from '.';

function Mock() {
	return (
		<InjectorProviders>
			<Simulation />
		</InjectorProviders>
	);
}

describe('Pages/Simulation', () => {
	it(`should render list items`, () => {
		const { getByText } = render(<Mock />);
	});
});
