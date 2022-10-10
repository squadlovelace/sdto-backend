import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableAddressUserRelation1665367341933 implements MigrationInterface {
    name = 'alterTableAddressUserRelation1665367341933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD UNIQUE INDEX \`IDX_d25f1ea79e282cc8a42bd616aa\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` ON \`address\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`DROP INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` ON \`address\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP INDEX \`IDX_d25f1ea79e282cc8a42bd616aa\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
