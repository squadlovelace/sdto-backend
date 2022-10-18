import { MigrationInterface, QueryRunner } from 'typeorm';

export class donorTable1665946269465 implements MigrationInterface {
  name = 'donorTable1665946269465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`donor\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('ALIVE', 'DECEASED') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`donor_organ_organ\` (\`donorId\` varchar(36) NOT NULL, \`organId\` varchar(36) NOT NULL, INDEX \`IDX_2cded9ed580cb829b6c1adfa56\` (\`donorId\`), INDEX \`IDX_0e7150cc1e7f35a00cbf06bbf8\` (\`organId\`), PRIMARY KEY (\`donorId\`, \`organId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`donor_organ_organ\` ADD CONSTRAINT \`FK_2cded9ed580cb829b6c1adfa565\` FOREIGN KEY (\`donorId\`) REFERENCES \`donor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`donor_organ_organ\` ADD CONSTRAINT \`FK_0e7150cc1e7f35a00cbf06bbf8d\` FOREIGN KEY (\`organId\`) REFERENCES \`organ\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`donor_organ_organ\` DROP FOREIGN KEY \`FK_0e7150cc1e7f35a00cbf06bbf8d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`donor_organ_organ\` DROP FOREIGN KEY \`FK_2cded9ed580cb829b6c1adfa565\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0e7150cc1e7f35a00cbf06bbf8\` ON \`donor_organ_organ\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2cded9ed580cb829b6c1adfa56\` ON \`donor_organ_organ\``,
    );
    await queryRunner.query(`DROP TABLE \`donor_organ_organ\``);
    await queryRunner.query(`DROP TABLE \`donor\``);
  }
}
