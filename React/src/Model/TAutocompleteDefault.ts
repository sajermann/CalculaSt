export type TAutocompleteDefault<T> = {
	options: T[];
	getOptionLabel: (option: T) => string;
};
