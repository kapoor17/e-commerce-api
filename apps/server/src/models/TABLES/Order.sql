CREATE TABLE IF NOT EXISTS "Order" (
  id uuid DEFAULT uuid_generate_v4(),
  payment_method varchar(10) NOT NULL,
  status_id uuid NOT NULL,
  total_amount money NOT NULL,
  customer_id uuid NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY(id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON "Order"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS order_status_idx
ON "Order" (status_id);

CREATE INDEX IF NOT EXISTS order_total_amount_idx
ON "Order" (total_amount DESC);

ALTER TABLE "Order" 
ADD CHECK (payment_method IN ('COD','RZRPY'));