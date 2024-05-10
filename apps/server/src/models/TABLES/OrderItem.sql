CREATE TABLE IF NOT EXISTS OrderItem (
  id uuid DEFAULT uuid_generate_v4(),
  quantity smallint NOT NULL,
  total_amount money NOT NULL,
  order_id uuid NOT NULL,
  product_id uuid,
  PRIMARY KEY(id)
);

ALTER TABLE OrderItem
ADD CHECK (quantity >= 1 AND quantity <= 5);

CREATE INDEX IF NOT EXISTS orderitem_order_id_idx
ON OrderItem (order_id);