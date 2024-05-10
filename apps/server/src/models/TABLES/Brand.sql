CREATE TABLE IF NOT EXISTS Brand (
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(50) UNIQUE NOT NULL,
  description text,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON Brand
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();