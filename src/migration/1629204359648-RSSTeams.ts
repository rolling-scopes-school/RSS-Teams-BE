import { MigrationInterface, QueryRunner } from 'typeorm';

export class RSSTeams1629204359648 implements MigrationInterface {
  public name: string = 'RSSTeams1629204359648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_prod_courses" ADD "is_active" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "rss_prod_courses" ADD "team_size" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_prod_courses" DROP COLUMN "team_size"`);
    await queryRunner.query(`ALTER TABLE "rss_prod_courses" DROP COLUMN "is_active"`);
  }
}
