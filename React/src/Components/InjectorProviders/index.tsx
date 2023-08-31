import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDarkMode } from '~/Hooks/UseDarkMode';

import '../../Config/i18n';
import { Header } from '../Header';
import { Toast } from '../Toast';

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
				<Toast />
				<QueryClientProvider
					client={
						new QueryClient({
							defaultOptions: {
								queries: {
									refetchOnWindowFocus: false,
									retry: false,
								},
							},
						})
					}
				>
					<div className="flex flex-col h-full">
						<Header />
						<main className="h-full flex-1">{children}</main>
					</div>
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
