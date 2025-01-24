BEGIN;

CREATE TABLE "role" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "password" VARCHAR(999) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "first_name" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20) NOT NULL,
  "starting_date" DATE NOT NULL,
  "ending_date" DATE NOT NULL,
  "role_id" INT NOT NULL REFERENCES "role"("id")
);

INSERT INTO "role" ("name") VALUES 
('admin'),
('user');

INSERT INTO "user" ("email", "password", "last_name", "first_name", "phone", "starting_date", "ending_date", "role_id") VALUES 
('admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$AZj1t56g/1uQEdAyqF34+w$vjOB07zdKQemH43AKp3hOqsfYleunmOwE8j75sGUfQM', 'admin', 'admin', '123456789', '2021-01-01', '2030-12-31', 1);

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

CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deletedAt" TIMESTAMP, "image_id" integer, CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "REL_61e0b28afe71313d16ac27a72f" UNIQUE ("image_id"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"));
CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "ismain" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"));
CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"));
CREATE TABLE "characteristics" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "deletedDate" TIMESTAMP, CONSTRAINT "UQ_8cc260e34ad9d4d362a36e11d2b" UNIQUE ("name"), CONSTRAINT "PK_a64133a287a0f2d735da40fcd89" PRIMARY KEY ("id"));
CREATE TABLE "product_characteristic_values" ("id" SERIAL NOT NULL, "value" text NOT NULL, "productId" integer NOT NULL, "characteristicId" integer NOT NULL, CONSTRAINT "PK_81291310a0cbf8209036b0c54ae" PRIMARY KEY ("id"));
CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"));
CREATE TABLE "products" ("id" SERIAL NOT NULL, "reference" character varying(50), "name" character varying(255), "shortDescription" text, "description" character varying, "price" numeric(10,2), "isPublished" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "brandId" integer, CONSTRAINT "UQ_4631ffea43463f4991394ebf980" UNIQUE ("reference"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"));
CREATE TABLE "product_characteristics" ("characteristicId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_89d88c7028b416c2f9c1db17aa4" PRIMARY KEY ("characteristicId", "productId"));
CREATE INDEX "IDX_480be687efe7ef4c231a1da483" ON "product_characteristics" ("characteristicId") ;
CREATE INDEX "IDX_d3944bc62d589d4c834e83f224" ON "product_characteristics" ("productId") ;
CREATE TABLE "products_images" ("product_id" integer NOT NULL, "image_id" integer NOT NULL, CONSTRAINT "PK_2c9790350051a71e033d8b98647" PRIMARY KEY ("product_id", "image_id"));
CREATE INDEX "IDX_9221a751985a7b44696b877485" ON "products_images" ("product_id") ;
CREATE INDEX "IDX_794f2a89cde12dfb92548be4a2" ON "products_images" ("image_id") ;
CREATE TABLE "products_categories_categories" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"));
CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") ;
CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") ;
CREATE TABLE "products_tags_tags" ("productsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_b06c7e3d7d74a176b4d936bcd73" PRIMARY KEY ("productsId", "tagsId"));
CREATE INDEX "IDX_88687975db5205fdbdb10969fc" ON "products_tags_tags" ("productsId") ;
CREATE INDEX "IDX_72fa6ba0f176a89a2e9d90274c" ON "products_tags_tags" ("tagsId") ;
ALTER TABLE "brand" ADD CONSTRAINT "FK_61e0b28afe71313d16ac27a72fd" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_characteristic_values" ADD CONSTRAINT "FK_5aa79a47806df97b926d95f1b6a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_characteristic_values" ADD CONSTRAINT "FK_d2bf93e4526debf5bb8b2bd8193" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_480be687efe7ef4c231a1da483e" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_d3944bc62d589d4c834e83f2245" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products_images" ADD CONSTRAINT "FK_9221a751985a7b44696b8774855" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products_images" ADD CONSTRAINT "FK_794f2a89cde12dfb92548be4a22" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_88687975db5205fdbdb10969fc4" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_72fa6ba0f176a89a2e9d90274c5" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;





INSERT INTO IMAGE (url)
SELECT DISTINCT CONCAT('/', image_1_src) 
FROM temp_import
WHERE image_1_src IS NOT NULL;

INSERT INTO IMAGE (url) select distinct CONCAT('/',brand_logo) 
FROM temp_import;

INSERT INTO brand (name, image_id, description)
SELECT DISTINCT temp.brand_name, img.id, temp.brand_description
FROM temp_import temp
LEFT JOIN image img ON '/' || temp.brand_logo = img.url
WHERE temp.brand_name IS NOT NULL
ON CONFLICT (name) 
DO NOTHING;

INSERT INTO products (reference, name, description, "shortDescription", price, "brandId") 
SELECT ti.ref, ti.name, ti.description, ti.short_description, ti.price, b.id 
FROM temp_import as ti 
JOIN brand as b ON b.name = ti.brand_name;


INSERT INTO products_images (product_id, image_id)
SELECT p.id, i.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN image i ON i.url = '/' || temp.image_1_src
WHERE temp.image_1_src IS NOT NULL
AND temp.image_1_src NOT IN (SELECT brand_logo FROM temp_import WHERE brand_logo IS NOT NULL)

UNION ALL

SELECT p.id, i.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN image i ON i.url = '/' || temp.image_2_src
WHERE temp.image_2_src IS NOT NULL

UNION ALL

SELECT p.id, i.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN image i ON i.url = '/' || temp.image_3_src
WHERE temp.image_3_src IS NOT NULL;

INSERT INTO characteristics (name)
SELECT DISTINCT property_1_label FROM temp_import WHERE property_1_label IS NOT NULL
UNION
SELECT DISTINCT property_2_label FROM temp_import WHERE property_2_label IS NOT NULL
UNION
SELECT DISTINCT property_3_label FROM temp_import WHERE property_3_label IS NOT NULL
UNION
SELECT DISTINCT property_4_label FROM temp_import WHERE property_4_label IS NOT NULL
UNION
SELECT DISTINCT property_5_label FROM temp_import WHERE property_5_label IS NOT NULL;

INSERT INTO product_characteristics ("characteristicId", "productId")
SELECT DISTINCT c.id, p.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_1_label
WHERE temp.property_1_label IS NOT NULL
UNION
SELECT DISTINCT c.id, p.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_2_label
WHERE temp.property_2_label IS NOT NULL
UNION
SELECT DISTINCT c.id, p.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_3_label
WHERE temp.property_3_label IS NOT NULL
UNION
SELECT DISTINCT c.id, p.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_4_label
WHERE temp.property_4_label IS NOT NULL
UNION
SELECT DISTINCT c.id, p.id
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_5_label
WHERE temp.property_5_label IS NOT NULL;

INSERT INTO product_characteristic_values ("productId", "characteristicId", "value")
SELECT p.id, c.id, CAST(temp.property_1_text AS TEXT)
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_1_label
WHERE temp.property_1_label IS NOT NULL AND temp.property_1_text IS NOT NULL

UNION ALL

SELECT p.id, c.id, CAST(temp.property_2_text AS TEXT)
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_2_label
WHERE temp.property_2_label IS NOT NULL AND temp.property_2_text IS NOT NULL

UNION ALL

SELECT p.id, c.id, CAST(temp.property_3_text AS TEXT)
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_3_label
WHERE temp.property_3_label IS NOT NULL AND temp.property_3_text IS NOT NULL

UNION ALL

SELECT p.id, c.id, CAST(temp.property_4_text AS TEXT)
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_4_label
WHERE temp.property_4_label IS NOT NULL AND temp.property_4_text IS NOT NULL

UNION ALL

SELECT p.id, c.id, CAST(temp.property_5_text AS TEXT)
FROM temp_import temp
JOIN products p ON p.reference = temp.ref
JOIN characteristics c ON c.name = temp.property_5_label
WHERE temp.property_5_label IS NOT NULL AND temp.property_5_text IS NOT NULL;

COMMIT;