/* eslint-disable camelcase */
import { MRT_TableInstance } from 'material-react-table';

export type TFooterTable<T extends Record<string, unknown>> = {
	table: MRT_TableInstance<T>;
};
