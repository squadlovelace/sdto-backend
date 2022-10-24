import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableReceiverAddColumnUserId1666139894505
  implements MigrationInterface
{
  name = 'alterTableReceiverAddColumnUserId1666139894505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`receiver\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`receiver\` ADD UNIQUE INDEX \`IDX_d268825d0f7be8920b3552b73a\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_d268825d0f7be8920b3552b73a\` ON \`receiver\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`receiver\` ADD CONSTRAINT \`FK_d268825d0f7be8920b3552b73a2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`receiver\` DROP FOREIGN KEY \`FK_d268825d0f7be8920b3552b73a2\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d268825d0f7be8920b3552b73a\` ON \`receiver\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`receiver\` DROP INDEX \`IDX_d268825d0f7be8920b3552b73a\``,
    );
    await queryRunner.query(`ALTER TABLE \`receiver\` DROP COLUMN \`userId\``);
  }
}
