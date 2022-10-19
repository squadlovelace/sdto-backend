import { HttpStatus } from '@nestjs/common';
import { BusinessRulesError } from '@shared/business-rules.error';

export class RgInUseError extends BusinessRulesError {
  constructor(response = 'RG já está em uso', status = HttpStatus.CONFLICT) {
    super(response, status);
  }
}
