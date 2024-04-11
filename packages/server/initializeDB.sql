CREATE TABLE Address (
    id uuid DEFAULT uuid_generate_v4(),
    street varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state char(2) NOT NULL,
    country char(2) NOT NULL,
    PRIMARY KEY(id)
);

CREATE INDEX address_city_idx
ON Address (city);

CREATE INDEX address_state_idx
ON Address (state);

CREATE INDEX address_country_idx
ON Address (country);

CREATE TABLE Cart (
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    customer_id uuid REFERENCES Customer(id) NOT NULL,
);

CREATE TABLE Customer (
    id uuid DEFAULT uuid_generate_v4(),
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar NOT NULL,
    address_id uuid REFERENCES Address(id),
    created_at timestamp DEFAULT current_timestamp,
    PRIMARY KEY(id)
)

ALTER TABLE Cart
ADD FOREIGN KEY (customer_id) REFERENCES Customer(id);

ALTER TABLE Customer
ADD FOREIGN KEY (cart_id) REFERENCES Cart(id);

CREATE INDEX customer_first_name_last_name_idx
ON Customer (first_name, last_name);

CREATE INDEX customer_email_idx
ON Customer (email);

CREATE TABLE Order (
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    status varchar(50) NOT NULL,
    total_amount money NOT NULL,
    customer_id uuid REFERENCES Customer(id) NOT NULL,
    PRIMARY KEY(id)
)

CREATE INDEX order_status_idx
ON Order (status);

CREATE INDEX order_total_amount_idx
ON Order (total_amount DESC);

CREATE TABLE Brand (
    id uuid DEFAULT uuid_generate_v4(),
    name varchar(50) UNIQUE NOT NULL,
    description text,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
)

CREATE TABLE Product (
    id uuid DEFAULT uuid_generate_v4(),
    name varchar(50) NOT NULL,
    description text,
    price money NOT NULL,
    brand_id varchar(50) REFERENCES Brand(id) NOT NULL,
    rating smallint NOT NULL,
    category varchar(50),
    stock_level integer NOT NULL,
    image_url varchar(255),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    PRIMARY KEY(id)
);

ALTER TABLE Product
ADD CHECK (rating >= 0 AND rating =< 5);

ALTER TABLE stock_level
ADD CHECK (stock_level >= 0);

CREATE INDEX product_brand_id_idx
ON Product (brand_id);

CREATE INDEX product_rating_idx
ON Product (rating);

CREATE INDEX product_category_idx
ON Product (category);

CREATE TABLE OrderItem (
    id uuid DEFAULT uuid_generate_v4(),
    order_id uuid REFERENCES Order(id) NOT NULL,
    product_id uuid REFERENCES Product(id) NOT NULL,
    PRIMARY KEY(id)
);

CREATE INDEX orderitem_order_id_idx
ON OrderItem (order_id);

CREATE TABLE CartItem (
    id uuid DEFAULT uuid_generate_v4(),
    quantity integer NOT NULL,
    cart_id uuid REFERENCES Cart(id) NOT NULL,
    product_id uuid REFERENCES Product(id) NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
);

ALTER TABLE CartItem
ADD CHECK (quantity >= 1 AND quantity <=5);

CREATE INDEX cartitem_cart_id_idx
ON CartItem (cart_id);