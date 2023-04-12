SELECT
  p.name AS name,
  p.price AS price,
  op.product_quantity AS quantity
FROM
  products AS p
  JOIN order_products op ON p.id = op.product_id
WHERE
  op.order_id = 1;