import { v4 as uuidv4 } from 'uuid';

export default class Guid {
	// eslint-disable-next-line no-restricted-syntax
	static new() {
		return uuidv4();
	}
}
