import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableAddressSetNullFieldComplement1665884192065
  implements MigrationInterface
{
  name = 'alterTableAddressSetNullFieldComplement1665884192065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`complement\` \`complement\` varchar(64) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`address\` CHANGE \`complement\` \`complement\` varchar(64) NOT NULL`,
    );
  }
}
