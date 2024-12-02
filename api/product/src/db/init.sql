-- Table temporaire pour l'import
CREATE TEMPORARY TABLE temp_import (
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

-- Import des données du CSV
COPY temp_import FROM '/docker-entrypoint-initdb.d/products.csv' WITH (FORMAT csv, HEADER true);

-- Insertion des marques
WITH unique_brands AS (
    SELECT DISTINCT ON (brand_name)
        brand_name,
        supplier_country,
        brand_logo,
        supplier_email,
        brand_description,
        supplier_phone
    FROM temp_import
    WHERE brand_name IS NOT NULL
)
INSERT INTO brands (name, logo, description, "createdAt", "updatedAt")
SELECT 
    brand_name,
    brand_logo,
    brand_description,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM unique_brands
ON CONFLICT (name) DO NOTHING
RETURNING id, name;

-- Insertion des contacts de marques
INSERT INTO contacts (phone, email, country, "brandId", "createdAt")
SELECT DISTINCT
    ti.supplier_phone,
    ti.supplier_email,
    ti.supplier_country,
    b.id,
    CURRENT_TIMESTAMP
FROM temp_import ti
JOIN brands b ON ti.brand_name = b.name
WHERE ti.supplier_email IS NOT NULL 
   OR ti.supplier_phone IS NOT NULL 
   OR ti.supplier_country IS NOT NULL;

-- Insertion des produits
INSERT INTO products (
    reference, 
    name, 
    "shortDescription", 
    description, 
    price, 
    "brandId",
    "createdAt",
    "updatedAt"
)
SELECT 
    ti.ref,
    ti.name,
    ti.short_description,
    ti.description,
    ti.price,
    b.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM temp_import ti
JOIN brands b ON ti.brand_name = b.name
ON CONFLICT (reference) 
DO UPDATE SET
    name = EXCLUDED.name,
    "shortDescription" = EXCLUDED."shortDescription",
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "updatedAt" = CURRENT_TIMESTAMP;

-- Insertion des images
INSERT INTO images (url, "altText", "isPrimary", "productId", "createdAt")
SELECT 
    url,
    alt_text,
    is_primary,
    p.id,
    CURRENT_TIMESTAMP
FROM products p
JOIN temp_import ti ON p.reference = ti.ref
CROSS JOIN LATERAL (
    VALUES 
        (ti.image_1_src, ti.image_1_alt, true),
        (ti.image_2_src, ti.image_2_alt, false),
        (ti.image_3_src, ti.image_3_alt, false)
) AS i(url, alt_text, is_primary)
WHERE i.url IS NOT NULL AND i.url != '';

-- Insertion des définitions de caractéristiques
INSERT INTO "characteristicDefinitions" (name, "createdAt")
SELECT DISTINCT label, CURRENT_TIMESTAMP
FROM (
    SELECT property_1_label as label FROM temp_import WHERE property_1_label IS NOT NULL
    UNION
    SELECT property_2_label FROM temp_import WHERE property_2_label IS NOT NULL
    UNION
    SELECT property_3_label FROM temp_import WHERE property_3_label IS NOT NULL
    UNION
    SELECT property_4_label FROM temp_import WHERE property_4_label IS NOT NULL
    UNION
    SELECT property_5_label FROM temp_import WHERE property_5_label IS NOT NULL
) unique_labels
ON CONFLICT (name) DO NOTHING;

-- Insertion des valeurs des caractéristiques
INSERT INTO "productCharacteristics" ("productId", "definitionId", value, "createdAt")
SELECT DISTINCT ON (p.id, cd.id)
    p.id,
    cd.id,
    c.value,
    CURRENT_TIMESTAMP
FROM products p
JOIN temp_import ti ON p.reference = ti.ref
CROSS JOIN LATERAL (
    VALUES 
        (ti.property_1_label, ti.property_1_text),
        (ti.property_2_label, ti.property_2_text),
        (ti.property_3_label, ti.property_3_text),
        (ti.property_4_label, ti.property_4_text),
        (ti.property_5_label, ti.property_5_text)
) AS c(label, value)
JOIN "characteristicDefinitions" cd ON cd.name = c.label
WHERE c.label IS NOT NULL AND c.value IS NOT NULL;

-- Nettoyage
DROP TABLE temp_import;