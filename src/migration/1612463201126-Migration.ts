import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1612463201126 implements MigrationInterface {
  public name: string = 'Migration1612463201126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_teams" DROP CONSTRAINT "FK_b66ee97fced64bedae8865e94ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_teams" ADD CONSTRAINT "FK_b66ee97fced64bedae8865e94ef" FOREIGN KEY ("course_id") REFERENCES "rss_courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_teams" DROP CONSTRAINT "FK_b66ee97fced64bedae8865e94ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_teams" ADD CONSTRAINT "FK_b66ee97fced64bedae8865e94ef" FOREIGN KEY ("course_id") REFERENCES "rss_courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
