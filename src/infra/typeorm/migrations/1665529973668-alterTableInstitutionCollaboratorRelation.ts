import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableInstitutionCollaboratorRelation1665529973668 implements MigrationInterface {
    name = 'alterTableInstitutionCollaboratorRelation1665529973668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution\` DROP FOREIGN KEY \`FK_959d6014ad713ee0bc18dbb6d4e\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2614ee1839e47abc4cdc62500\` ON \`collaborator\``);
        await queryRunner.query(`ALTER TABLE \`institution\` DROP COLUMN \`collaboratorId\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD \`institutionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD CONSTRAINT \`FK_bcbe37120006686cbf43fec6d09\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP FOREIGN KEY \`FK_bcbe37120006686cbf43fec6d09\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP COLUMN \`institutionId\``);
        await queryRunner.query(`ALTER TABLE \`institution\` ADD \`collaboratorId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b2614ee1839e47abc4cdc62500\` ON \`collaborator\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`institution\` ADD CONSTRAINT \`FK_959d6014ad713ee0bc18dbb6d4e\` FOREIGN KEY (\`collaboratorId\`) REFERENCES \`collaborator\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
