import { MigrationInterface, QueryRunner } from 'typeorm';
import { Profile } from '../entities/profile';
import { ProfileTypes } from '../../../shared/profile-types.enum';

export class createProfiles1665891052312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Profile)
      .values([
        { type: ProfileTypes.ADMIN, description: 'Administrador' },
        { type: ProfileTypes.PROFISSIONAL, description: 'Profissional' },
        { type: ProfileTypes.DONOR, description: 'Doador' },
        { type: ProfileTypes.RECEIVER, description: 'Receptor' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
