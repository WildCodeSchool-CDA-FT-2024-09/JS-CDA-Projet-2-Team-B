import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1737551837866 implements MigrationInterface {
  name = 'Version1737551837866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deletedAt" TIMESTAMP, "image_id" integer, CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "REL_61e0b28afe71313d16ac27a72f" UNIQUE ("image_id"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "image" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "ismain" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "characteristics" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "deletedDate" TIMESTAMP, CONSTRAINT "UQ_8cc260e34ad9d4d362a36e11d2b" UNIQUE ("name"), CONSTRAINT "PK_a64133a287a0f2d735da40fcd89" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_characteristic_values" ("id" SERIAL NOT NULL, "value" text NOT NULL, "productId" integer NOT NULL, "characteristicId" integer NOT NULL, CONSTRAINT "PK_81291310a0cbf8209036b0c54ae" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "reference" character varying(50), "name" character varying(255), "shortDescription" text, "description" character varying, "price" numeric(10,2), "isPublished" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "brandId" integer, CONSTRAINT "UQ_4631ffea43463f4991394ebf980" UNIQUE ("reference"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "product_characteristics" ("characteristicId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_89d88c7028b416c2f9c1db17aa4" PRIMARY KEY ("characteristicId", "productId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_480be687efe7ef4c231a1da483" ON "product_characteristics" ("characteristicId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d3944bc62d589d4c834e83f224" ON "product_characteristics" ("productId") `
    );
    await queryRunner.query(
      `CREATE TABLE "products_images" ("product_id" integer NOT NULL, "image_id" integer NOT NULL, CONSTRAINT "PK_2c9790350051a71e033d8b98647" PRIMARY KEY ("product_id", "image_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9221a751985a7b44696b877485" ON "products_images" ("product_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_794f2a89cde12dfb92548be4a2" ON "products_images" ("image_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "products_categories_categories" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `
    );
    await queryRunner.query(
      `CREATE TABLE "products_tags_tags" ("productsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_b06c7e3d7d74a176b4d936bcd73" PRIMARY KEY ("productsId", "tagsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88687975db5205fdbdb10969fc" ON "products_tags_tags" ("productsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72fa6ba0f176a89a2e9d90274c" ON "products_tags_tags" ("tagsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_61e0b28afe71313d16ac27a72fd" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristic_values" ADD CONSTRAINT "FK_5aa79a47806df97b926d95f1b6a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristic_values" ADD CONSTRAINT "FK_d2bf93e4526debf5bb8b2bd8193" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_480be687efe7ef4c231a1da483e" FOREIGN KEY ("characteristicId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" ADD CONSTRAINT "FK_d3944bc62d589d4c834e83f2245" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" ADD CONSTRAINT "FK_9221a751985a7b44696b8774855" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" ADD CONSTRAINT "FK_794f2a89cde12dfb92548be4a22" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_88687975db5205fdbdb10969fc4" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_tags_tags" ADD CONSTRAINT "FK_72fa6ba0f176a89a2e9d90274c5" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_72fa6ba0f176a89a2e9d90274c5"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_tags_tags" DROP CONSTRAINT "FK_88687975db5205fdbdb10969fc4"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" DROP CONSTRAINT "FK_794f2a89cde12dfb92548be4a22"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" DROP CONSTRAINT "FK_9221a751985a7b44696b8774855"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" DROP CONSTRAINT "FK_d3944bc62d589d4c834e83f2245"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristics" DROP CONSTRAINT "FK_480be687efe7ef4c231a1da483e"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristic_values" DROP CONSTRAINT "FK_d2bf93e4526debf5bb8b2bd8193"`
    );
    await queryRunner.query(
      `ALTER TABLE "product_characteristic_values" DROP CONSTRAINT "FK_5aa79a47806df97b926d95f1b6a"`
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_61e0b28afe71313d16ac27a72fd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72fa6ba0f176a89a2e9d90274c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_88687975db5205fdbdb10969fc"`
    );
    await queryRunner.query(`DROP TABLE "products_tags_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`
    );
    await queryRunner.query(`DROP TABLE "products_categories_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_794f2a89cde12dfb92548be4a2"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9221a751985a7b44696b877485"`
    );
    await queryRunner.query(`DROP TABLE "products_images"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d3944bc62d589d4c834e83f224"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_480be687efe7ef4c231a1da483"`
    );
    await queryRunner.query(`DROP TABLE "product_characteristics"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "product_characteristic_values"`);
    await queryRunner.query(`DROP TABLE "characteristics"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "image"`);
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
