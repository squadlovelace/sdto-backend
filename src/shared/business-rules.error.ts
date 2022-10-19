import { HttpException } from '@nestjs/common';

export abstract class BusinessRulesError extends HttpException {
  protected constructor(
    response = 'Generic Business Rules Error',
    status: number,
  ) {
    super(response, status);
  }
}
