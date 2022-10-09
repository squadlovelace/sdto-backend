import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserEntity1665344878816 implements MigrationInterface {
    name = 'createUserEntity1665344878816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(200) NOT NULL, \`name\` varchar(200) NOT NULL, \`password\` varchar(128) NOT NULL, \`rg\` varchar(128) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`phone\` varchar(14) NOT NULL, \`birthDate\` date NOT NULL, \`bloodType\` varchar(3) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_ce0d72875e07836ac661c7c37d\` (\`rg\`), UNIQUE INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a6235b5ef0939d8deaad755fc8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce0d72875e07836ac661c7c37d\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
