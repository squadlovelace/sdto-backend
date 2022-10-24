import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SigninService } from '../services/signin.service';
import { CredentialsDto, SigninOutputDto } from '../dto';

@ApiTags('Autenticação')
@Controller('api/v1/auth')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @ApiOperation({
    summary: 'Realiza o login do usuário na plataforma',
  })
  @ApiResponse({ status: 200, type: SigninOutputDto })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<SigninOutputDto> {
    return await this.signinService.signin(credentialsDto);
  }
}
