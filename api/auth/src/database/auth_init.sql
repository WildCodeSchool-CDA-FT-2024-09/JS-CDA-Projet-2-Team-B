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

COMMIT;