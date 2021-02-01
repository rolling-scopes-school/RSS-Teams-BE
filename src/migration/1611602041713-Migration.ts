import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1611602041713 implements MigrationInterface {
  public name: string = 'Migration1611602041713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rss_courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), CONSTRAINT "PK_cbd9b71b16e629615fa4f076075" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rss_teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_cfe87d9b6665b89be36910b6e4d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rss_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255), "last_name" character varying(255), "github" character varying(255), "telegram" character varying(255), "discord" character varying(255), "score" integer NOT NULL DEFAULT '1000', "country" character varying(255), "city" character varying(255), "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4a707d61e3083be7e9899c00066" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO public.rss_users (id, first_name, last_name, github, telegram, discord, score, country, city, is_admin)
            VALUES
                (uuid_generate_v4(), 'Andrei', 'Shelenhouski', 'manuminsk', '', '', 1000, 'Belarus', 'Minsk', true)`,
    );
    await queryRunner.query(
      `INSERT INTO public.rss_courses (id, name)
            VALUES
                (uuid_generate_v4(), 'RSS 2020Q1 JS'),
                (uuid_generate_v4(), 'RSS 2020Q3 JS'),
                (uuid_generate_v4(), 'RSS 2021Q1 JS'),
                (uuid_generate_v4(), 'RSS 2021Q3 JS'),
                (uuid_generate_v4(), 'RSS 2020Q1 ReactJS'),
                (uuid_generate_v4(), 'RSS 2020Q3 ReactJS'),
                (uuid_generate_v4(), 'RSS 2021Q1 ReactJS'),
                (uuid_generate_v4(), 'RSS 2021Q3 ReactJS'),
                (uuid_generate_v4(), 'RSS 2020Q1 Angular'),
                (uuid_generate_v4(), 'RSS 2020Q3 Angular'),
                (uuid_generate_v4(), 'RSS 2021Q1 Angular'),
                (uuid_generate_v4(), 'RSS 2021Q3 Angular'),
                (uuid_generate_v4(), 'RSS 2020Q1 NodeJS'),
                (uuid_generate_v4(), 'RSS 2020Q3 NodeJS'),
                (uuid_generate_v4(), 'RSS 2021Q1 NodeJS'),
                (uuid_generate_v4(), 'RSS 2021Q3 NodeJS')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rss_users"`);
    await queryRunner.query(`DROP TABLE "rss_teams"`);
    await queryRunner.query(`DROP TABLE "rss_courses"`);
  }
}
