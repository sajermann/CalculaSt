/* eslint-disable react/button-has-type */
/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useDarkMode } from '.';

function Mock() {
	const { isDarkMode, setIsDarkMode } = useDarkMode();
	return (
		<div>
			<button onClick={() => setIsDarkMode()}>Toggle</button>

			<span>
				{isDarkMode ? 'Dark Mode is enabled' : 'Dark Mode is Disabled'}
			</span>
		</div>
	);
}

describe('Hooks/useDarkMode', () => {
	it(`should test all paths`, async () => {
		const { getByText } = render(<Mock />);
		expect(getByText(/Dark Mode is Disabled/i)).toBeInTheDocument();
		fireEvent.click(getByText('Toggle'));
		expect(getByText(/Dark Mode is enabled/i)).toBeInTheDocument();
	});
});
