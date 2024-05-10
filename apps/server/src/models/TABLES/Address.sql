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