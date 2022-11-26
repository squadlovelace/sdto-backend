import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableReceiverAndDonor1669423449833 implements MigrationInterface {
    name = 'alterTableReceiverAndDonor1669423449833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`DROP INDEX \`REL_c90cc76cb4251db5a1a714251c\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`responsibleId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`responsibleId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c90cc76cb4251db5a1a714251c\` ON \`user\` (\`responsibleId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
