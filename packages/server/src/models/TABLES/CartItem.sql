CREATE TABLE IF NOT EXISTS CartItem (
  id uuid DEFAULT uuid_generate_v4(),
  quantity smallint NOT NULL,
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON CartItem
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

ALTER TABLE CartItem
ADD CHECK (quantity >= 1 AND quantity <=5);

CREATE INDEX IF NOT EXISTS cartitem_cart_id_idx
ON CartItem (cart_id);