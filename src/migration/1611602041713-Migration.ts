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
      `INSERT INTO public.rss_courses (id, name)
            VALUES
                (uuid_generate_v4(), 'JavaScript/Front-end EN'),
                (uuid_generate_v4(), 'JS/FE 2021Q1'),
                (uuid_generate_v4(), 'Angular 2021Q1'),
                (uuid_generate_v4(), 'React 2021 Q1     '),
                (uuid_generate_v4(), 'ML Intro 2021Q1'),
                (uuid_generate_v4(), 'ST 2021 Q1'),
                (uuid_generate_v4(), 'Node.js in Cloud AWS'),
                (uuid_generate_v4(), 'NodeJS 2020 Q3'),
                (uuid_generate_v4(), 'JavaScript/Front-end 2020 Q3: '),
                (uuid_generate_v4(), 'UpSkill Lab'),
                (uuid_generate_v4(), 'RSS React 2020 Q3'),
                (uuid_generate_v4(), 'RSS Angular 2020 Q3'),
                (uuid_generate_v4(), 'EPAM JS Mentoring'),
                (uuid_generate_v4(), 'JS Fundamentals'),
                (uuid_generate_v4(), 'Rolling Scopes NodeJS 2020 Q1     '),
                (uuid_generate_v4(), 'Tbilisi Training Center | Front-end'),
                (uuid_generate_v4(), 'JS/FE Mentoring Program in Poland'),
                (uuid_generate_v4(), 'BI-course'),
                (uuid_generate_v4(), 'TEST COURSE'),
                (uuid_generate_v4(), 'Rolling Scopes Android 2020'),
                (uuid_generate_v4(), 'Rolling Scopes iOS 2020'),
                (uuid_generate_v4(), 'RSS Angular 2020 Q1'),
                (uuid_generate_v4(), 'RSS React 2020'),
                (uuid_generate_v4(), 'Rolling Scopes School 2020 Q1: JavaScript/Front-end'),
                (uuid_generate_v4(), 'EPAM JS'),
                (uuid_generate_v4(), 'Rolling Scopes School: Short Track 2019 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019: Uzbekistan'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q1: Short Track'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2018 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2018 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2017 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2017 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2016 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2016 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2015 Q1'),
                (uuid_generate_v4(), 'JavaScript/Front-end EN'),
                (uuid_generate_v4(), 'JS/FE 2021Q1'),
                (uuid_generate_v4(), 'Angular 2021Q1'),
                (uuid_generate_v4(), 'React 2021 Q1     '),
                (uuid_generate_v4(), 'ML Intro 2021Q1'),
                (uuid_generate_v4(), 'ST 2021 Q1'),
                (uuid_generate_v4(), 'Node.js in Cloud AWS'),
                (uuid_generate_v4(), 'NodeJS 2020 Q3'),
                (uuid_generate_v4(), 'JavaScript/Front-end 2020 Q3: '),
                (uuid_generate_v4(), 'UpSkill Lab'),
                (uuid_generate_v4(), 'RSS React 2020 Q3'),
                (uuid_generate_v4(), 'RSS Angular 2020 Q3'),
                (uuid_generate_v4(), 'EPAM JS Mentoring'),
                (uuid_generate_v4(), 'JS Fundamentals'),
                (uuid_generate_v4(), 'Rolling Scopes NodeJS 2020 Q1     '),
                (uuid_generate_v4(), 'Tbilisi Training Center | Front-end'),
                (uuid_generate_v4(), 'JS/FE Mentoring Program in Poland'),
                (uuid_generate_v4(), 'BI-course'),
                (uuid_generate_v4(), 'TEST COURSE'),
                (uuid_generate_v4(), 'Rolling Scopes Android 2020'),
                (uuid_generate_v4(), 'Rolling Scopes iOS 2020'),
                (uuid_generate_v4(), 'RSS Angular 2020 Q1'),
                (uuid_generate_v4(), 'RSS React 2020'),
                (uuid_generate_v4(), 'Rolling Scopes School 2020 Q1: JavaScript/Front-end'),
                (uuid_generate_v4(), 'EPAM JS'),
                (uuid_generate_v4(), 'Rolling Scopes School: Short Track 2019 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019: Uzbekistan'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q1: Short Track'),
                (uuid_generate_v4(), 'Rolling Scopes School 2019 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2018 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2018 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2017 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2017 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2016 Q3'),
                (uuid_generate_v4(), 'Rolling Scopes School 2016 Q1'),
                (uuid_generate_v4(), 'Rolling Scopes School 2015 Q1')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rss_users"`);
    await queryRunner.query(`DROP TABLE "rss_teams"`);
    await queryRunner.query(`DROP TABLE "rss_courses"`);
  }
}
