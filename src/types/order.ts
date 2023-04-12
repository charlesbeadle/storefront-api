import { ProductQuantity } from './product';

export type OrderType = {
	uid: string;
	status: string;
};

export type OrderProducts = {
	status: string;
	products: ProductQuantity[];
};
