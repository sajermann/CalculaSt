import { AppBar, Toolbar, Typography } from '@mui/material';
import { SelectLanguage } from '../SelectLanguage';
import { Sidebar } from '../Sidebar';
import { ToggleDarkMode } from '../ToggleDarkMode';

export function Header() {
	return (
		<AppBar position="static">
			<Toolbar className="w-full p-5 flex justify-between">
				<Sidebar />
				<Typography variant="h3" component="div">
					Calcula St
				</Typography>
				<div className="flex items-center">
					<ToggleDarkMode />
					<SelectLanguage />
				</div>
			</Toolbar>
		</AppBar>
	);
}
