import { Box, CircularProgress, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { green } from '@mui/material/colors';
import { useState } from 'react';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useSimulations } from '~/Hooks/UseSimulations';
import { useTranslation } from '~/Hooks/UseTranslation';
import { handleCreateSimulation } from '~/Utils/HandleCreateSimulation';
import { handleSaveItem } from '~/Utils/HandleSaveItem';
import { handleUpdateSimulation } from '~/Utils/HandleUpdateSimulation';

export function SaveSimulation() {
	const [title, setTitle] = useState('');
	const { calculaSt, setCalculaSt } = useCalculaSt();
	const { createSimulation, updateSimulation } = useSimulations();
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSuccessSave, setIsSuccessSave] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	function handleSave() {
		if (!calculaSt.id) {
			setIsOpen(true);
			return;
		}
		console.log('salvando');
		handleSaveItem({
			onFinalize: () =>
				handleUpdateSimulation({
					calculaSt,
					updateSimulation,
				}),
			isLoading,
			setIsOpen,
			setLoading: setIsLoading,
			setSuccess: setIsSuccessSave,
		});
	}

	const buttonSx = {
		...(isSuccessSave && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleSave}>
				{translate('SAVE')}
			</Button>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{translate('TITLE')}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<FormControl fullWidth>
							<TextField
								onChange={e => setTitle(e.target.value)}
								variant="standard"
								fullWidth
								value={title}
								type="text"
								label={translate('TITLE')}
								InputProps={{
									autoComplete: 'off',
									autoFocus: true,
								}}
							/>
						</FormControl>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{translate('CANCEL')}</Button>
					<Box sx={{ m: 1, position: 'relative' }}>
						<Button
							variant="contained"
							sx={buttonSx}
							disabled={isLoading || !title}
							onClick={() =>
								handleSaveItem({
									onFinalize: () =>
										handleCreateSimulation({
											calculaSt,
											createSimulation,
											setCalculaSt,
											title,
										}),
									isLoading,
									setIsOpen,
									setLoading: setIsLoading,
									setSuccess: setIsSuccessSave,
								})
							}
						>
							{translate('CONFIRM')}
						</Button>
						{isLoading && (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
									position: 'absolute',
									top: '50%',
									left: '50%',
									marginTop: '-12px',
									marginLeft: '-12px',
								}}
							/>
						)}
					</Box>
				</DialogActions>
			</Dialog>
		</div>
	);
}
