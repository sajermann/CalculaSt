import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCalculaSt } from '~/Hooks/UseCalculaSt';
import { useSimulations } from '~/Hooks/UseSimulations';
import { useToast } from '~/Hooks/UseToast';
import { useTranslation } from '~/Hooks/UseTranslation';
import { handleSimulateFetch } from '~/Utils/HandleSimulateFetch';
import { FeedbackButtonText } from '../FeedbackButtonText';

export function DeleteSimulation() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { setMessage, setIsOpen: setIsOpenToast } = useToast();
	const { calculaSt } = useCalculaSt();
	const { deleteSimulation } = useSimulations();
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSuccessDelete, setIsSuccessDelete] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	function confirmDelete() {
		handleSimulateFetch({
			onFinalize: () => {
				deleteSimulation(calculaSt);
				setMessage('Excluído com sucesso');
				setIsOpenToast(true);
				navigate('/simulations');
			},
			isLoading: isSuccessDelete,
			setIsOpen,
			setLoading: setIsLoadingDelete,
			setSuccess: setIsSuccessDelete,
		});
	}

	if (!id) return null;

	return (
		<div>
			<Button color="error" onClick={() => setIsOpen(true)}>
				{translate('DELETE')}
			</Button>

			<Dialog
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{translate('DELETE_SIMULATION')}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" className="w-72">
						{translate('SURE_DELETE_SIMULATION')}
					</DialogContentText>
				</DialogContent>
				<DialogActions className="flex gap-4 justify-end">
					<Button
						onClick={() => {
							setIsOpen(false);
						}}
					>
						{translate('CANCEL')}
					</Button>
					<FeedbackButtonText
						disabled={isLoadingDelete}
						onClick={confirmDelete}
						isLoading={isLoadingDelete}
						isSuccess={isSuccessDelete}
						text={translate('CONFIRM')}
					/>
				</DialogActions>
			</Dialog>
		</div>
	);
}
