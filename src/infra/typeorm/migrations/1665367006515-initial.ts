import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1665367006515 implements MigrationInterface {
    name = 'initial1665367006515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('ADMIN', 'PROFESSIONAL', 'DONOR', 'RECEIVER') NOT NULL, \`description\` varchar(150) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`responsible\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(200) NULL, \`relationship\` varchar(64) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(250) NOT NULL, \`name\` varchar(200) NOT NULL, \`password\` varchar(128) NOT NULL, \`rg\` varchar(128) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`phone\` varchar(14) NOT NULL, \`birthDate\` date NOT NULL, \`gender\` varchar(64) NOT NULL, \`bloodType\` enum ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL, \`profileId\` varchar(36) NULL, \`responsibleId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ce0d72875e07836ac661c7c37d\` (\`rg\`), UNIQUE INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` (\`cpf\`), UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), UNIQUE INDEX \`REL_c90cc76cb4251db5a1a714251c\` (\`responsibleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`street\` varchar(200) NOT NULL, \`number\` varchar(10) NOT NULL, \`zipcode\` varchar(10) NOT NULL, \`neighborhood\` varchar(64) NOT NULL, \`city\` varchar(64) NOT NULL, \`state\` varchar(64) NOT NULL, \`complement\` varchar(64) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organ\` (\`id\` varchar(36) NOT NULL, \`ischemiaTime\` varchar(15) NOT NULL, \`organType\` enum ('ORGANS', 'TISSUES') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`DROP TABLE \`organ\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`REL_c90cc76cb4251db5a1a714251c\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce0d72875e07836ac661c7c37d\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`responsible\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
