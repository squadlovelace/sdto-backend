import { HttpStatus } from '@nestjs/common';
import { BusinessRulesError } from '@shared/business-rules.error';

export class EmailInUseError extends BusinessRulesError {
  constructor(response = 'Email já está em uso', status = HttpStatus.CONFLICT) {
    super(response, status);
  }
}
