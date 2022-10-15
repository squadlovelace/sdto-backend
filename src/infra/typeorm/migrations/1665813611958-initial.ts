import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1665813611958 implements MigrationInterface {
    name = 'initial1665813611958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('ADMIN', 'PROFESSIONAL', 'DONOR', 'RECEIVER') NOT NULL, \`description\` varchar(150) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`responsible\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(200) NULL, \`relationship\` varchar(64) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organ\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(128) NOT NULL, \`ischemiaTime\` varchar(15) NULL, \`organType\` enum ('ORGAN', 'TISSUE') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receiver\` (\`id\` varchar(36) NOT NULL, \`rgct\` varchar(128) NULL, \`comorbidity\` varchar(128) NULL, UNIQUE INDEX \`IDX_67339adcc9691221016f904499\` (\`rgct\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(250) NOT NULL, \`name\` varchar(200) NOT NULL, \`password\` varchar(128) NOT NULL, \`rg\` varchar(128) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`phone\` varchar(14) NOT NULL, \`birthDate\` date NOT NULL, \`gender\` varchar(64) NOT NULL, \`bloodType\` enum ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL, \`profileId\` varchar(36) NULL, \`responsibleId\` varchar(36) NULL, UNIQUE INDEX \`IDX_ce0d72875e07836ac661c7c37d\` (\`rg\`), UNIQUE INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` (\`cpf\`), UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), UNIQUE INDEX \`REL_c90cc76cb4251db5a1a714251c\` (\`responsibleId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`collaborator\` (\`id\` varchar(36) NOT NULL, \`crm\` varchar(8) NULL, \`position\` varchar(64) NOT NULL, \`institutionId\` varchar(36) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_b2614ee1839e47abc4cdc62500\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`institution\` (\`id\` varchar(36) NOT NULL, \`companyName\` varchar(200) NOT NULL, \`cnpj\` varchar(14) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`street\` varchar(200) NOT NULL, \`number\` varchar(10) NOT NULL, \`zipcode\` varchar(10) NOT NULL, \`neighborhood\` varchar(64) NOT NULL, \`city\` varchar(64) NOT NULL, \`state\` varchar(64) NOT NULL, \`complement\` varchar(64) NOT NULL, \`userId\` varchar(36) NULL, \`institutionId\` varchar(36) NULL, UNIQUE INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` (\`userId\`), UNIQUE INDEX \`REL_ccf4dd497ef8b0f9cd672fc936\` (\`institutionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receiver_organ_organ\` (\`receiverId\` varchar(36) NOT NULL, \`organId\` varchar(36) NOT NULL, INDEX \`IDX_707c584e90cdee3f6f45454545\` (\`receiverId\`), INDEX \`IDX_24764d9fe0461ce83819bbbff6\` (\`organId\`), PRIMARY KEY (\`receiverId\`, \`organId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD CONSTRAINT \`FK_bcbe37120006686cbf43fec6d09\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD CONSTRAINT \`FK_b2614ee1839e47abc4cdc62500f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_ccf4dd497ef8b0f9cd672fc9368\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receiver_organ_organ\` ADD CONSTRAINT \`FK_707c584e90cdee3f6f454545452\` FOREIGN KEY (\`receiverId\`) REFERENCES \`receiver\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receiver_organ_organ\` ADD CONSTRAINT \`FK_24764d9fe0461ce83819bbbff60\` FOREIGN KEY (\`organId\`) REFERENCES \`organ\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receiver_organ_organ\` DROP FOREIGN KEY \`FK_24764d9fe0461ce83819bbbff60\``);
        await queryRunner.query(`ALTER TABLE \`receiver_organ_organ\` DROP FOREIGN KEY \`FK_707c584e90cdee3f6f454545452\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_ccf4dd497ef8b0f9cd672fc9368\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP FOREIGN KEY \`FK_b2614ee1839e47abc4cdc62500f\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP FOREIGN KEY \`FK_bcbe37120006686cbf43fec6d09\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`DROP INDEX \`IDX_24764d9fe0461ce83819bbbff6\` ON \`receiver_organ_organ\``);
        await queryRunner.query(`DROP INDEX \`IDX_707c584e90cdee3f6f45454545\` ON \`receiver_organ_organ\``);
        await queryRunner.query(`DROP TABLE \`receiver_organ_organ\``);
        await queryRunner.query(`DROP INDEX \`REL_ccf4dd497ef8b0f9cd672fc936\` ON \`address\``);
        await queryRunner.query(`DROP INDEX \`REL_d25f1ea79e282cc8a42bd616aa\` ON \`address\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP TABLE \`institution\``);
        await queryRunner.query(`DROP INDEX \`REL_b2614ee1839e47abc4cdc62500\` ON \`collaborator\``);
        await queryRunner.query(`DROP TABLE \`collaborator\``);
        await queryRunner.query(`DROP INDEX \`REL_c90cc76cb4251db5a1a714251c\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce0d72875e07836ac661c7c37d\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_67339adcc9691221016f904499\` ON \`receiver\``);
        await queryRunner.query(`DROP TABLE \`receiver\``);
        await queryRunner.query(`DROP TABLE \`organ\``);
        await queryRunner.query(`DROP TABLE \`responsible\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
