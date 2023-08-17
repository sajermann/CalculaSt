import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import { useState } from 'react';

export function MoreOptions() {
	const [openAddItem, setOpenItem] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [isPrinting, setIsPrinting] = useState(false);
	const [open, setOpen] = useState(false);
	const [hidden, setHidden] = useState(false);

	function handleShare() {
		setIsSharing(true);
		setTimeout(() => {
			setIsSharing(false);
		}, 3000);
	}

	function handlePrint() {
		setIsPrinting(true);
		setTimeout(() => {
			setIsPrinting(false);
		}, 3000);
	}

	const actions = [
		{
			icon: <PrintIcon />,
			name: 'Imprimir',
			onclick: () => handlePrint(),
		},
		{
			icon: <ShareIcon />,
			name: 'Compartilhar',
			onclick: () => handleShare(),
		},
	];

	const handleVisibility = () => {
		setHidden(prevHidden => !prevHidden);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<SpeedDial
				ariaLabel="SpeedDial openIcon example"
				icon={
					<SpeedDialIcon icon={<MoreVertIcon />} openIcon={<CancelIcon />} />
				}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				// onClick={() => teste('add')}
			>
				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						// onClick={handleClose}
						onClick={action.onclick}
					/>
				))}
			</SpeedDial>
		</div>
	);
}
