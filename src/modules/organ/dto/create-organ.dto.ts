import { OrganTypes } from 'src/shared/organ-types.enum';

export class CreateOrganDto {
  name: string;
  ischemiaTime: string;
  organType: OrganTypes;
}
