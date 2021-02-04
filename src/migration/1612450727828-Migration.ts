import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612450727828 implements MigrationInterface {
  public name: string = 'Migration1612450727828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_users" ADD "avatar" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "rss_users" ADD "email" character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "rss_users" DROP COLUMN "avatar"`);
  }
}
