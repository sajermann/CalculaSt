import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setIsOpen(open);
		};

	const OPTIONS = [
		{ label: 'Home', to: '/', icon: <HomeIcon /> },
		{ label: 'Criar', to: '/create-simulation', icon: <AddIcon /> },
		{
			label: 'Simulações',
			to: '/list-simulation',
			icon: <FormatListNumberedIcon />,
		},
	];

	return (
		<>
			<IconButton
				size="large"
				color="inherit"
				aria-label="open drawer"
				onClick={toggleDrawer(true)}
				edge="start"
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<List>
						{OPTIONS.map(opt => (
							<Link to={opt.to} key={opt.label}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>{opt.icon}</ListItemIcon>
										<ListItemText primary={opt.label} />
									</ListItemButton>
								</ListItem>
							</Link>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
}
