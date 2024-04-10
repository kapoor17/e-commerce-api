CREATE TABLE Address (
    id uuid DEFAULT uuid_generate_v4(),
    street varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
    customer_id uuid NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Customer (
    id uuid DEFAULT uuid_generate_v4(),
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    password varchar NOT NULL,
    address_id uuid REFERENCES Address(id) NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    PRIMARY KEY(id)
)

CREATE TABLE Order (
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    status varchar(50) NOT NULL,
    total_amount money NOT NULL,
    customer_id uuid REFERENCES Customer(id) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE Product (
    id uuid DEFAULT uuid_generate_v4,
    name varchar(50) NOT NULL,
    description varchar(100),
    price money NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    brand varchar(50) NOT NULL,
    rating integer NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE OrderItem (
    id uuid DEFAULT uuid_generate_v4(),
    order_id uuid REFERENCES Order(id) NOT NULL,
    product_id uuid REFERENCES Product(id) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Cart (
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    customer_id uuid REFERENCES Customer(id) NOT NULL,
);

CREATE TABLE CartItem (
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    quantity integer NOT NULL,
    cart_id uuid REFERENCES Cart(id) NOT NULL,
    product_id uuid REFERENCES Product(id) NOT NULL,
);