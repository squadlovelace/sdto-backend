import { ApiProperty } from '@nestjs/swagger'
import { Collaborator } from "src/infra/typeorm/entities/collaborator";
import { Address } from "src/infra/typeorm/entities/address";

export class CreateInstitutionalDto {
    @ApiProperty()
    companyName: string;

    @ApiProperty()
    cnpj: string;

    @ApiProperty()
    address: Address;
}