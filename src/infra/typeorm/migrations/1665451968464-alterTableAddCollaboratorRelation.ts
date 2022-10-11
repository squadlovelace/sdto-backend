import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableAddCollaboratorRelation1665451968464 implements MigrationInterface {
    name = 'alterTableAddCollaboratorRelation1665451968464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ccf4dd497ef8b0f9cd672fc936\` ON \`address\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD UNIQUE INDEX \`IDX_b2614ee1839e47abc4cdc62500\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b2614ee1839e47abc4cdc62500\` ON \`collaborator\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`collaborator\` ADD CONSTRAINT \`FK_b2614ee1839e47abc4cdc62500f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP FOREIGN KEY \`FK_b2614ee1839e47abc4cdc62500f\``);
        await queryRunner.query(`DROP INDEX \`REL_b2614ee1839e47abc4cdc62500\` ON \`collaborator\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP INDEX \`IDX_b2614ee1839e47abc4cdc62500\``);
        await queryRunner.query(`ALTER TABLE \`collaborator\` DROP COLUMN \`userId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ccf4dd497ef8b0f9cd672fc936\` ON \`address\` (\`institutionId\`)`);
    }

}
