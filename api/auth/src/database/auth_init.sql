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

COMMIT;