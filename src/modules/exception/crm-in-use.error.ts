import { HttpStatus } from '@nestjs/common';
import { BusinessRulesError } from '@shared/business-rules.error';

export class CrmInUseError extends BusinessRulesError {
  constructor(response = 'CRM já está em uso', status = HttpStatus.CONFLICT) {
    super(response, status);
  }
}
