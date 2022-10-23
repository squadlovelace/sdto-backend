import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRelationTableDonorOrgan1666467967742 implements MigrationInterface {
    name = 'fixRelationTableDonorOrgan1666467967742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1066cb3fd61d250765bba26acc\` ON \`donor\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1066cb3fd61d250765bba26acc\` ON \`donor\` (\`userId\`)`);
    }

}
