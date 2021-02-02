import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612279390866 implements MigrationInterface {
  public name: string = 'Migration1612279390866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_teams" ADD "tg_link" character varying(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_teams" DROP COLUMN "tg_link"`);
  }
}
