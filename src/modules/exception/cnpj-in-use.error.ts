import { HttpStatus } from '@nestjs/common';
import { BusinessRulesError } from '@shared/business-rules.error';

export class CnpjInUseError extends BusinessRulesError {
  constructor(response = 'CNPJ já está em uso', status = HttpStatus.CONFLICT) {
    super(response, status);
  }
}
