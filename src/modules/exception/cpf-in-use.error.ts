import { HttpStatus } from '@nestjs/common';
import { BusinessRulesError } from '@shared/business-rules.error';

export class CpfInUseError extends BusinessRulesError {
  constructor(response = 'CPF já está em uso', status = HttpStatus.CONFLICT) {
    super(response, status);
  }
}
