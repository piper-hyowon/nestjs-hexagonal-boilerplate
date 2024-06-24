import { UserService } from '../../user/port/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';

import { CreateUserCommand } from 'src/module/user/port/dto/user.command';
import { FindUniqueUserQuery } from 'src/module/user/port/dto/user.query';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { SignUpDto, SignUpResonse } from '../dto/sign-up.dto';
import {
  JWT,
  SignInDto,
  SignInPayload,
  SignInResponse,
} from '../dto/sign-in.dto';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly environmentService: EnvironmentService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResonse> {
    const { email, password, grade } = signUpDto;
    const hashedPassword = await this.hashingService.hash(password);

    const user = await this.userService.createUser(
      new CreateUserCommand(email, hashedPassword, grade),
    );

    delete user.password;

    return user;
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.userService.findUnqiueUser(
      new FindUniqueUserQuery(signInDto.email),
    );
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isCorrectPassword = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Password does not match');
    }

    const jwts = await this.generateTokens({
      sub: user.id.toString(),
      email: user.email,
    });

    delete user.password;

    return {
      ...jwts,
      user,
      lastLoggedAt: new Date(),
    };
  }

  private async generateTokens(payload: SignInPayload): Promise<JWT> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.environmentService.get<number>('JWT_ACCESS_TOKEN_TTL'),
      }),
      this.jwtService.signAsync(
        { id: payload.sub },
        {
          expiresIn: this.environmentService.get<number>(
            'JWT_REFRESH_TOKEN_TTL',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {});
      const user = await this.userService.findOneByIdOrFail(parseInt(sub));
      return this.generateTokens({ sub, email: user.email });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
