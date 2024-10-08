import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ErrorCode } from 'src/common/constants/error-codes';
import { EnvironmentService } from 'src/config/environment/environment.service';

// main.ts 에 ValidationPipe 에러를 BAD_REQUEST 로 정의함
@Catch(BadRequestException)
export class ParameterValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  constructor(private readonly environmentService: EnvironmentService) {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const exceptionObj = exception.getResponse() as Record<string, any>;
    const isProduction = this.environmentService.isProduction();

    response.status(exception.getStatus()).json({
      code: ErrorCode.InvalidParameter,
      message: isProduction
        ? exceptionObj.error
        : exceptionObj.message.toString(),
    });
  }
}
