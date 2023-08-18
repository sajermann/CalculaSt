/* eslint-disable no-unused-vars */
import { forwardRef } from 'react';
// typings are here:
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

const icons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const localization = {
	body: {
		deleteTooltip: 'Excluir',
		editTooltip: 'Editar',
		addTooltip: 'Adicionar',
		emptyDataSourceMessage: 'Nenhum registro para exibir',
		editRow: {
			saveTooltip: 'Salvar',
			cancelTooltip: 'Cancelar',
			deleteText: 'Você tem certeza que deseja deletar esse registro?',
		},
	},
	header: {
		actions: '',
	},
	toolbar: {
		searchTooltip: 'Pesquisar',
		exportTitle: 'Exportar',
		exportAriaLabel: 'Exportar',
		exportName: 'Exportar',
		nRowsSelected: '{0} linha(s) selecionada',
		searchPlaceholder: 'Pesquisar',
	},
	pagination: {
		labelRowsSelect: 'linhas',
		labelDisplayedRows: '{from}-{to} de {count}',
		firstTooltip: 'Primeira página',
		previousTooltip: 'Página anterior',
		nextTooltip: 'Próxima página',
		lastTooltip: 'Última página',
	},
};

export const tableConfiguration = {
	icons,
	localization,
};
