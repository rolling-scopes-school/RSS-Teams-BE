import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612191636661 implements MigrationInterface {
  public name: string = 'Migration1612191636661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_teams" ADD "course_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "rss_teams" ADD CONSTRAINT "FK_b66ee97fced64bedae8865e94ef" FOREIGN KEY ("course_id") REFERENCES "rss_courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_teams" DROP CONSTRAINT "FK_b66ee97fced64bedae8865e94ef"`,
    );
    await queryRunner.query(`ALTER TABLE "rss_teams" DROP COLUMN "course_id"`);
  }
}
