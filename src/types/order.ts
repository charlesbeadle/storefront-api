import { CartItem } from './cart';

export type OrderProduct = {
	id: number;
	quantity: number;
};

export type OrderPayload = {
	uid: number;
	products: OrderProduct[];
};

export type OrderProducts = {
	status: string;
	products: CartItem[];
};

export type OrderSummary = {
	order: {
		id: number;
		user_id: number;
		status: string;
	};
	products: {
		id: number;
		order_id: number;
		product_id: number;
		product_quantity: number;
	}[];
};
