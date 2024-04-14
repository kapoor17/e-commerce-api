import pg from 'pg';
const {Client} = pg;

(async () => {

    const installUUIDExtension = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;

    const createUpdatedAtTriggerFunction = `
        CREATE OR REPLACE FUNCTION update_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
        NEW."updated_at" := NOW();
        RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `

    const createAddressTable = `
        CREATE TABLE IF NOT EXISTS Address (
            id uuid DEFAULT uuid_generate_v4(),
            street varchar(50) NOT NULL,
            city varchar(50) NOT NULL,
            state char(2) NOT NULL,
            country char(2) NOT NULL,
            PRIMARY KEY(id)
        );
        
        CREATE INDEX IF NOT EXISTS address_city_idx
        ON Address (city);
        
        CREATE INDEX IF NOT EXISTS address_state_idx
        ON Address (state);
        
        CREATE INDEX IF NOT EXISTS address_country_idx
        ON Address (country);
    `;

    const createCustomerTable = `
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
    `;

    const createCustomerAddressRelation = `
        ALTER TABLE Customer
        ADD FOREIGN KEY (address_id) REFERENCES Address(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL;
    `;

    const createOrderTable = `
        CREATE TABLE IF NOT EXISTS "Order" (
            id uuid DEFAULT uuid_generate_v4(),
            payment_method varchar(50) NOT NULL,
            status varchar(50) NOT NULL,
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
        ON "Order" (status);
        
        CREATE INDEX IF NOT EXISTS order_total_amount_idx
        ON "Order" (total_amount DESC);
    `;

    const createCustomerOrderRelation = `
        ALTER TABLE "Order"
        ADD FOREIGN KEY (customer_id) REFERENCES Customer(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT;
    `

    const createOrderItemTable = `
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
    `;

    const createOrderOrderItemRelation = `
            ALTER TABLE OrderItem
            ADD FOREIGN KEY (order_id) REFERENCES "Order"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT;
    `

    const createBrandTable = `
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
    `;

    const createProductTable = `
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
    `;

    const createProductBrandRelation = `
        ALTER TABLE Product
        ADD FOREIGN KEY (brand_id) REFERENCES Brand(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;
    `

    const createProductOrderItemRelation = `
        ALTER TABLE OrderItem
        ADD FOREIGN KEY (product_id) REFERENCES Product(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT;
    `

    const createCartItemTable = `
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
    `;

    const createProductCartItemRelation = `
        ALTER TABLE CartItem
        ADD FOREIGN KEY (product_id) REFERENCES Product(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;
    `;

    const createCartTable = `
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
    `;

    const createCartCartItemRelation = `
        ALTER TABLE CartItem
        ADD FOREIGN KEY (cart_id) REFERENCES Cart(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;
    `;

    const createCartCustomerRelation = `
        ALTER TABLE Cart
        ADD FOREIGN KEY (customer_id) REFERENCES Customer(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE;

        ALTER TABLE Customer
        ADD FOREIGN KEY (cart_id) REFERENCES Cart(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL;
    `;

    const client = new Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT || ""),
        database: process.env.PG_DATABASE
    });

    await client.connect()
        .then(async () => {
            try{
                await client.query(installUUIDExtension);
                await client.query(createUpdatedAtTriggerFunction);
                await client.query(createAddressTable);
                await client.query(createCustomerTable);
                await client.query(createOrderTable);
                await client.query(createCustomerOrderRelation);
                await client.query(createCustomerAddressRelation);
                await client.query(createOrderItemTable);
                await client.query(createOrderOrderItemRelation);
                await client.query(createBrandTable);
                await client.query(createProductTable);
                await client.query(createProductBrandRelation);
                await client.query(createProductOrderItemRelation);
                await client.query(createCartItemTable);
                await client.query(createProductCartItemRelation);
                await client.query(createCartTable);
                await client.query(createCartCartItemRelation);
                await client.query(createCartCustomerRelation);
            }catch(err){
                console.log(`Error while creating the schema: ${err}`)
            }
        })
        .catch((e) => {
            console.error(`Error while connecting to the client: ${e}`);
        })

    console.log((await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")).rows);

    await client.end();
})();