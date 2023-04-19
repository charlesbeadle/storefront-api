import { Product } from '../../models/product';
import client from '../../database';

const genMock = async () => {
	const conn = await client.connect();
	const sql = "SELECT * FROM products WHERE name = 'Squatty Potty'";
	const result = await conn.query(sql);
	const product = result.rows[0];
	conn.release();
	return product;
};

describe('Product Model', () => {
	const productInstance = new Product();
	afterAll(async () => {
		const conn = await client.connect();
		const sql = "DELETE FROM products WHERE name = 'Squatty Potty'";
		await conn.query(sql);
		conn.release();
	});

	describe('Create Product', () => {
		it('Creates a new product', async () => {
			const product = await productInstance.create({
				name: 'Squatty Potty',
				price: 19.99,
			});
			const { name, price } = product;
			expect(name).toBe('Squatty Potty');
			expect(String(price)).toBe('19.99');
		});
	});

	describe('Show Product', () => {
		it('Gets product data by ID', async () => {
			const { id } = await genMock();
			const { name, price } = await productInstance.show(id);
			expect(name).toBe('Squatty Potty');
			expect(String(price)).toBe('19.99');
		});
	});

	describe('Show Products', () => {
		it('Gets an array of products', async () => {
			const products = await productInstance.index();
			const product = products[0];
			expect(products.length >= 1).toBe(true);
			expect(product.hasOwnProperty('name')).toBe(true);
			expect(product.hasOwnProperty('price')).toBe(true);
		});
	});
});
