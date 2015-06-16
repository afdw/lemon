CREATE TABLE planets
(
  planet_key    UUID NOT NULL DEFAULT uuid_generate_v4(),
  planet_name   TEXT,
  planet_photo  TEXT,
  planet_index  INTEGER,
  planet_symbol TEXT,
  CONSTRAINT planets_pkey PRIMARY KEY (planet_key)
)
WITH (
OIDS =FALSE
);