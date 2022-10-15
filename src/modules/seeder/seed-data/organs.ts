import { OrganTypes } from 'src/shared/organ-types.enum';

export const organData = [
  {
    name: 'CÓRNEAS',
    ischemiaTime: '6 a 14 dias',
    organType: OrganTypes.ORGAN,
  },
  { name: 'CORAÇÃO', ischemiaTime: '6 horas', organType: OrganTypes.ORGAN },
  { name: 'PULMÃO', ischemiaTime: '6 horas', organType: OrganTypes.ORGAN },
  { name: 'RIN', ischemiaTime: '48 horas', organType: OrganTypes.ORGAN },
  { name: 'FÍGADO', ischemiaTime: '24 horas', organType: OrganTypes.ORGAN },
  { name: 'PÂNCREAS', ischemiaTime: '24 horas', organType: OrganTypes.ORGAN },
  { name: 'OSSOS', ischemiaTime: '5 anos', organType: OrganTypes.ORGAN },
  { name: 'MÉDULA ÓSSEA', organType: OrganTypes.ORGAN },
  { name: 'PELE', organType: OrganTypes.TISSUE },
  { name: 'VALVAS CARDÍACAS', organType: OrganTypes.ORGAN },
];
