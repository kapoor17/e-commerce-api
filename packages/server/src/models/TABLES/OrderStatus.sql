CREATE TABLE IF NOT EXISTS OrderStatus (
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(50) NOT NULL,
  label_color char(7) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO OrderStatus (name, label_color) 
VALUES  ('created', '#FFA500'),     -- Orange  
        ('payed', '#00CED1'),       -- Green  
        ('confirmed', '#0000FF'),   -- Blue  
        ('dispatched', '#800080'),  -- Purple  
        ('shipped', '#FF4500'),     -- Orange-Red  
        ('received', '#008000'),    -- Dark Turquoise  
        ('returned', '#FF0000'),    -- Red  
        ('refunded', '#FFD700');    -- Gold