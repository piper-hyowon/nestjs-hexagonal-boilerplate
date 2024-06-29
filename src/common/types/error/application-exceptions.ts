import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../../constants/error-codes';
import { CodeToStatus } from 'src/common/constants/error-code-to-status';

export abstract class ApplicationException extends Error {
  code: ErrorCode;

  constructor(code?: ErrorCode, err?: string | Error) {
    super();
    this.code = code || ErrorCode.InternalServerError;

    if (typeof err === 'string') {
      this.message = err;
    }

    if (typeof err === 'object') {
      this.name = err.name;
      this.message = err.message;
      this.stack = err.stack;
    }
  }

  getStatus(): HttpStatus {
    return CodeToStatus[this.code];
  }
}

export class ContentNotFoundError extends ApplicationException {
  constructor(domain: string, id: string | number) {
    const message = `${domain} #${id} not found`;
    super(ErrorCode.ContentNotFound, message);
  }
}

export class DuplicateValueError extends ApplicationException {
  constructor(domain: string, property: string, value: string | number) {
    const message = `Duplicate ${property} for ${domain}: ${value}`;
    super(ErrorCode.DuplicateValue, message);
  }
}

export class MissingAuthTokenError extends ApplicationException {
  constructor() {
    super(
      ErrorCode.MissingAuthToken,
      'Access token is missing in the request header.',
    );
  }
}

export class InvalidAccessTokenError extends ApplicationException {
  constructor() {
    super(ErrorCode.InvalidAccessToken, 'Invalid Access Token');
  }
}

export class InvalidatedRefreshTokenError extends ApplicationException {
  constructor() {
    super(
      ErrorCode.InvalidRefreshToken,
      'Access denied. Your refresh token might have been stolen',
    );
  }
}

export class IncorrectLoginInfo extends ApplicationException {
  constructor() {
    super(
      ErrorCode.IncorrectLoginInfo,
      'The email address or password is incorrect',
    );
  }
}
