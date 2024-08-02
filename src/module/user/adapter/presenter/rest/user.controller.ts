import { Get, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ResponseData } from 'src/common/decorator/response-data.decorator';
import { AuthorizationToken } from 'src/docs/constant/authorization-token';
import { ActiveUser } from 'src/module/iam/decorators/active-user.decorator';
import { HttpController } from 'src/module/iam/decorators/http-controller.decorator';
import { ActiveUserData } from 'src/module/iam/dto/sign-in.dto';
import { GetUserResponse } from './dto/user.dto';
import { UserService } from 'src/module/user/application/user.service';
import { ApiDescription } from 'src/common/decorator/api-description.decorator';

@HttpController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiDescription({
    tags: ['유저'],
    summary: '유저 정보 조회',
    dataResponse: {
      status: HttpStatus.OK,
      schema: GetUserResponse,
    },
  })
  @ResponseData(GetUserResponse)
  @ApiBearerAuth(AuthorizationToken.BearerUserToken)
  @Get()
  async getUser(@ActiveUser() userData: ActiveUserData) {
    const user = await this.userService.findOneByIdOrFail(userData.sub);

    return GetUserResponse.toDto(user);
  }
}
