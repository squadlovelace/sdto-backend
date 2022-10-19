import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableDonorAddColumnUserId1666147037294 implements MigrationInterface {
    name = 'alterTableDonorAddColumnUserId1666147037294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d268825d0f7be8920b3552b73a\` ON \`receiver\``);
        await queryRunner.query(`ALTER TABLE \`donor\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`donor\` ADD UNIQUE INDEX \`IDX_1066cb3fd61d250765bba26acc\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`donor\` CHANGE \`type\` \`type\` enum ('LIVING', 'DECEASED') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1066cb3fd61d250765bba26acc\` ON \`donor\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`donor\` ADD CONSTRAINT \`FK_1066cb3fd61d250765bba26accb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donor\` DROP FOREIGN KEY \`FK_1066cb3fd61d250765bba26accb\``);
        await queryRunner.query(`DROP INDEX \`REL_1066cb3fd61d250765bba26acc\` ON \`donor\``);
        await queryRunner.query(`ALTER TABLE \`donor\` CHANGE \`type\` \`type\` enum ('ALIVE', 'DECEASED') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`donor\` DROP INDEX \`IDX_1066cb3fd61d250765bba26acc\``);
        await queryRunner.query(`ALTER TABLE \`donor\` DROP COLUMN \`userId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d268825d0f7be8920b3552b73a\` ON \`receiver\` (\`userId\`)`);
    }

}
