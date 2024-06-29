import { prisma } from 'src/prisma';
import { Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { ResponseData } from 'src/common/decorator/response-data.decorator';
import { AuthorizationToken } from 'src/docs/constant/authorization-token';
import { ActiveUser } from 'src/module/iam/decorators/active-user.decorator';
import { HttpController } from 'src/module/iam/decorators/http-controller.decorator';
import { ActiveUserData } from 'src/module/iam/dto/sign-in.dto';
import { UserService } from 'src/module/user/application/port/user.service';
import { ResponsesDataDto } from 'src/common/dto/responses-data.dto';
import { GetUserResponse } from './dto/user.dto';
import { PrismaClient } from '@prisma/client';
import { Auth } from 'src/module/iam/decorators/auth.decorator';
import { AuthType } from 'src/module/iam/enums/auth-type.enum';

@HttpController('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly prisma: PrismaClient,
  ) {}

  @ApiOperation({ summary: '로그인한 유저 정보 조회' })
  @ResponseData(GetUserResponse)
  @ApiBearerAuth(AuthorizationToken.BearerUserToken)
  @Auth(AuthType.None)
  @Get()
  async getUser(@ActiveUser() userData: ActiveUserData) {
    console.log(prisma.user.fields);
    await prisma.user.create({
      data: { email: 'test@a.com', password: '1234' },
    });

    const user = await this.userService.findOneByIdOrFail(userData.sub);

    return new ResponsesDataDto(GetUserResponse.toDto(user));
  }
}
