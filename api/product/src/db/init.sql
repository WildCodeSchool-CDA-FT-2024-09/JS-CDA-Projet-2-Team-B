DO $$ BEGIN RAISE NOTICE 'Import des données...'; END $$;

CREATE TABLE temp_import (
    ref VARCHAR(255),
    short_description TEXT,
    description TEXT,
    image_1_src VARCHAR(255),
    image_1_alt VARCHAR(255),
    image_2_src VARCHAR(255),
    image_2_alt VARCHAR(255),
    image_3_src VARCHAR(255),
    image_3_alt VARCHAR(255),
    price DECIMAL(10, 2),
    brand_name VARCHAR(255),
    brand_logo VARCHAR(255),
    name VARCHAR(255),
    supplier_country VARCHAR(255),
    supplier_phone TEXT,
    supplier_email VARCHAR(255),
    brand_description TEXT,
    property_1_label VARCHAR(255),
    property_1_text TEXT,
    property_2_label VARCHAR(255),
    property_2_text TEXT,
    property_3_label VARCHAR(255),
    property_3_text TEXT,
    property_4_label VARCHAR(255),
    property_4_text TEXT,
    property_5_label VARCHAR(255),
    property_5_text TEXT
);

COPY temp_import FROM '/docker-entrypoint-initdb.d/products.csv' WITH (FORMAT csv, HEADER true);
