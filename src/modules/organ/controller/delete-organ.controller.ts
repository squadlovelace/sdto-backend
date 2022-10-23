import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DeleteOrganService } from '../services/delete-organ.service';

@ApiTags('Órgãos')
@Controller('api/v1/organ')
export class DeleteOrganController {
  constructor(private readonly organService: DeleteOrganService) {}

  @ApiOperation({
    summary: 'Remove um órgão cadastrado',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.organService.delete(id);
  }
}
