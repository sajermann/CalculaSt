import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useSimulations } from '~/Hooks/UseSimulations';
import { useToast } from '~/Hooks/UseToast';
import { useTranslation } from '~/Hooks/UseTranslation';
import { handleCreateSimulation } from '~/Utils/HandleCreateSimulation';
import { handleSimulateFetch } from '~/Utils/HandleSimulateFetch';
import { handleUpdateSimulation } from '~/Utils/HandleUpdateSimulation';
import { FeedbackButtonText } from '../FeedbackButtonText';

export function SaveSimulation() {
	const navigate = useNavigate();
	const { setMessage, setIsOpen: setIsOpenToast } = useToast();
	const [title, setTitle] = useState('');
	const { calculaSt, setCalculaSt } = useCalculaSt();
	const { createSimulation, updateSimulation } = useSimulations();
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSuccessCreate, setIsSuccessCreate] = useState(false);
	const [isLoadingCreate, setIsLoadingCreate] = useState(false);
	const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	function handleSave() {
		if (!calculaSt.id) {
			setIsOpen(true);
			return;
		}
		handleSimulateFetch({
			onFinalize: () => {
				handleUpdateSimulation({
					calculaSt,
					updateSimulation,
				});
				setMessage('Atualizado com sucesso');
				setIsOpenToast(true);
			},
			isLoading: isSuccessUpdate,
			setIsOpen,
			setLoading: setIsLoadingUpdate,
			setSuccess: setIsSuccessUpdate,
		});
	}

	return (
		<div>
			<FeedbackButtonText
				disabled={isLoadingUpdate}
				onClick={handleSave}
				isLoading={isLoadingUpdate}
				isSuccess={isSuccessUpdate}
				text={translate('SAVE')}
			/>

			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{translate('SAVE_SIMULATION')}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" className="w-72">
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
				<DialogActions className="flex gap-4 justify-end">
					<Button onClick={handleClose}>{translate('CANCEL')}</Button>
					<FeedbackButtonText
						disabled={isLoadingCreate || !title}
						onClick={() =>
							handleSimulateFetch({
								onFinalize: () => {
									handleCreateSimulation({
										calculaSt,
										createSimulation,
										setCalculaSt,
										title,
										navigation: id => navigate(`/simulation/${id}`),
									});
									setMessage('Salvo com sucesso');
									setIsOpenToast(true);
								},
								isLoading: isLoadingCreate,
								setIsOpen,
								setLoading: setIsLoadingCreate,
								setSuccess: setIsSuccessCreate,
							})
						}
						isLoading={isLoadingCreate}
						isSuccess={isSuccessCreate}
						text={translate('CONFIRM')}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
