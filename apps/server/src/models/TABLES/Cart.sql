CREATE TABLE IF NOT EXISTS Cart (
  id uuid DEFAULT uuid_generate_v4(),
  customer_id uuid NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON Cart
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();