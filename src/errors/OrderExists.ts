export class OrderExists extends Error {
	constructor(message: string) {
		super(message);
		this.message = message;
	}
}
