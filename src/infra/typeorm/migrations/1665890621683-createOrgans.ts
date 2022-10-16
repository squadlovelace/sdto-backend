import { OrganTypes } from '../../../shared/organ-types.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Organ } from '../entities/organ';

export class createOrgans1665890621683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Organ)
      .values([
        {
          name: 'CÓRNEAS',
          ischemiaTime: '6 a 14 dias',
          organType: OrganTypes.ORGAN,
        },
        {
          name: 'CORAÇÃO',
          ischemiaTime: '6 horas',
          organType: OrganTypes.ORGAN,
        },
        {
          name: 'PULMÃO',
          ischemiaTime: '6 horas',
          organType: OrganTypes.ORGAN,
        },
        { name: 'RIN', ischemiaTime: '48 horas', organType: OrganTypes.ORGAN },
        {
          name: 'FÍGADO',
          ischemiaTime: '24 horas',
          organType: OrganTypes.ORGAN,
        },
        {
          name: 'PÂNCREAS',
          ischemiaTime: '24 horas',
          organType: OrganTypes.ORGAN,
        },
        { name: 'OSSOS', ischemiaTime: '5 anos', organType: OrganTypes.ORGAN },
        { name: 'MÉDULA ÓSSEA', organType: OrganTypes.ORGAN },
        { name: 'PELE', organType: OrganTypes.TISSUE },
        { name: 'VALVAS CARDÍACAS', organType: OrganTypes.ORGAN },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
