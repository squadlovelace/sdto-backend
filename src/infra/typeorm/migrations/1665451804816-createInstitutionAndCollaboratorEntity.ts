import { MigrationInterface, QueryRunner } from "typeorm";

export class createInstitutionAndCollaboratorEntity1665451804816 implements MigrationInterface {
    name = 'createInstitutionAndCollaboratorEntity1665451804816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`DROP INDEX \`IDX_d25f1ea79e282cc8a42bd616aa\` ON \`address\``);
        await queryRunner.query(`CREATE TABLE \`collaborator\` (\`id\` varchar(36) NOT NULL, \`crm\` varchar(8) NOT NULL, \`position\` varchar(64) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`institution\` (\`id\` varchar(36) NOT NULL, \`companyName\` varchar(200) NOT NULL, \`cnpj\` varchar(14) NOT NULL, \`collaboratorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receiver\` (\`id\` varchar(36) NOT NULL, \`rgct\` varchar(128) NULL, \`comorbidity\` varchar(128) NULL, \`organId\` varchar(36) NULL, UNIQUE INDEX \`IDX_67339adcc9691221016f904499\` (\`rgct\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`institutionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD UNIQUE INDEX \`IDX_ccf4dd497ef8b0f9cd672fc936\` (\`institutionId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ccf4dd497ef8b0f9cd672fc936\` ON \`address\` (\`institutionId\`)`);
        await queryRunner.query(`ALTER TABLE \`institution\` ADD CONSTRAINT \`FK_959d6014ad713ee0bc18dbb6d4e\` FOREIGN KEY (\`collaboratorId\`) REFERENCES \`collaborator\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`receiver\` ADD CONSTRAINT \`FK_224320768d10bd8158a26f16546\` FOREIGN KEY (\`organId\`) REFERENCES \`organ\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_ccf4dd497ef8b0f9cd672fc9368\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_ccf4dd497ef8b0f9cd672fc9368\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c90cc76cb4251db5a1a714251cd\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``);
        await queryRunner.query(`ALTER TABLE \`receiver\` DROP FOREIGN KEY \`FK_224320768d10bd8158a26f16546\``);
        await queryRunner.query(`ALTER TABLE \`institution\` DROP FOREIGN KEY \`FK_959d6014ad713ee0bc18dbb6d4e\``);
        await queryRunner.query(`DROP INDEX \`REL_ccf4dd497ef8b0f9cd672fc936\` ON \`address\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP INDEX \`IDX_ccf4dd497ef8b0f9cd672fc936\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`institutionId\``);
        await queryRunner.query(`DROP INDEX \`IDX_67339adcc9691221016f904499\` ON \`receiver\``);
        await queryRunner.query(`DROP TABLE \`receiver\``);
        await queryRunner.query(`DROP TABLE \`institution\``);
        await queryRunner.query(`DROP TABLE \`collaborator\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d25f1ea79e282cc8a42bd616aa\` ON \`address\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c90cc76cb4251db5a1a714251cd\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
