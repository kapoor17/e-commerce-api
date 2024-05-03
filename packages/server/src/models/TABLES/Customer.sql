CREATE TABLE IF NOT EXISTS Customer (
  id uuid DEFAULT uuid_generate_v4(),
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar NOT NULL,
  address_id uuid,
  cart_id uuid,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY(id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON Customer
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS customer_first_name_last_name_idx
ON Customer (first_name, last_name);

CREATE INDEX IF NOT EXISTS customer_email_idx
ON Customer (email);