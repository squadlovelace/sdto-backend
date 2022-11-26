import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableUserFieldBirthDate1669429267411 implements MigrationInterface {
    name = 'alterTableUserFieldBirthDate1669429267411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthDate\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthDate\` date NOT NULL`);
    }

}
