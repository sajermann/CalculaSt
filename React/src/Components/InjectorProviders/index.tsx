import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDarkMode } from '~/Hooks/UseDarkMode';

import '../../Config/i18n';
import { Header } from '../Header';

export function InjectorProviders({ children }: { children: ReactNode }) {
	const { isDarkMode } = useDarkMode();

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: isDarkMode ? 'dark' : 'light',
				},
			}),
		[isDarkMode],
	);
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<main className="h-full">{children}</main>
			</ThemeProvider>
		</BrowserRouter>
	);
}
