CREATE TABLE IF NOT EXISTS Product (
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(50) NOT NULL,
  description text,
  price money NOT NULL,
  old_price money,
  brand_id uuid NOT NULL,
  rating smallint NOT NULL,
  category varchar(50),
  stock_level integer NOT NULL,
  image_url varchar(255),
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY(id)
);

CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON Product
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

ALTER TABLE Product
ADD CHECK (rating >= 0 AND rating <= 5);

ALTER TABLE Product
ADD CHECK (stock_level >= 0);

CREATE INDEX IF NOT EXISTS product_price_idx
ON Product (price);

CREATE INDEX IF NOT EXISTS product_brand_id_idx
ON Product (brand_id);

CREATE INDEX IF NOT EXISTS product_rating_idx
ON Product (rating);

CREATE INDEX IF NOT EXISTS product_category_idx
ON Product (category);