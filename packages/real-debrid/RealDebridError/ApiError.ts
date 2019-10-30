// tslint:disable: max-classes-per-file
import {RealDebridError} from './RealDebridError';

export abstract class ApiError extends RealDebridError {
  protected constructor(
    public readonly code: keyof typeof errorCodes,
    message: string,
    public readonly url: string,
    public readonly body?: any,
  ) {
    super(message);
  }
}
// prettier-ignore-start
export class InternalError extends ApiError {
  public static readonly code: -1 = -1;
  public constructor(message: string, url: string, body?: any) {
    super(-1, message, url, body);
  }
}
export class MissingParameterError extends ApiError {
  public static readonly code: 1 = 1;
  public constructor(message: string, url: string, body?: any) {
    super(1, message, url, body);
  }
}
export class BadParameterValueError extends ApiError {
  public static readonly code: 2 = 2;
  public constructor(message: string, url: string, body?: any) {
    super(2, message, url, body);
  }
}
export class UnknownMethodError extends ApiError {
  public static readonly code: 3 = 3;
  public constructor(message: string, url: string, body?: any) {
    super(3, message, url, body);
  }
}
export class MethodNotAllowedError extends ApiError {
  public static readonly code: 4 = 4;
  public constructor(message: string, url: string, body?: any) {
    super(4, message, url, body);
  }
}
export class SlowDownError extends ApiError {
  public static readonly code: 5 = 5;
  public constructor(message: string, url: string, body?: any) {
    super(5, message, url, body);
  }
}
export class RessourceUnreachableError extends ApiError {
  public static readonly code: 6 = 6;
  public constructor(message: string, url: string, body?: any) {
    super(6, message, url, body);
  }
}
export class ResourceNotFoundError extends ApiError {
  public static readonly code: 7 = 7;
  public constructor(message: string, url: string, body?: any) {
    super(7, message, url, body);
  }
}
export class BadTokenError extends ApiError {
  public static readonly code: 8 = 8;
  public constructor(message: string, url: string, body?: any) {
    super(8, message, url, body);
  }
}
export class PermissionDeniedError extends ApiError {
  public static readonly code: 9 = 9;
  public constructor(message: string, url: string, body?: any) {
    super(9, message, url, body);
  }
}
export class TwoFactorAuthenticationNeededError extends ApiError {
  public static readonly code: 10 = 10;
  public constructor(message: string, url: string, body?: any) {
    super(10, message, url, body);
  }
}
export class TwoFactorAuthenticationPendingError extends ApiError {
  public static readonly code: 11 = 11;
  public constructor(message: string, url: string, body?: any) {
    super(11, message, url, body);
  }
}
export class InvalidLoginError extends ApiError {
  public static readonly code: 12 = 12;
  public constructor(message: string, url: string, body?: any) {
    super(12, message, url, body);
  }
}
export class InvalidPasswordError extends ApiError {
  public static readonly code: 13 = 13;
  public constructor(message: string, url: string, body?: any) {
    super(13, message, url, body);
  }
}
export class AccountLockedError extends ApiError {
  public static readonly code: 14 = 14;
  public constructor(message: string, url: string, body?: any) {
    super(14, message, url, body);
  }
}
export class AccountNotActivatedError extends ApiError {
  public static readonly code: 15 = 15;
  public constructor(message: string, url: string, body?: any) {
    super(15, message, url, body);
  }
}
export class UnsupportedHosterError extends ApiError {
  public static readonly code: 16 = 16;
  public constructor(message: string, url: string, body?: any) {
    super(16, message, url, body);
  }
}
export class HosterInMaintenanceError extends ApiError {
  public static readonly code: 17 = 17;
  public constructor(message: string, url: string, body?: any) {
    super(17, message, url, body);
  }
}
export class HosterLimitReachedError extends ApiError {
  public static readonly code: 18 = 18;
  public constructor(message: string, url: string, body?: any) {
    super(18, message, url, body);
  }
}
export class HosterTemporarilyUnavailableError extends ApiError {
  public static readonly code: 19 = 19;
  public constructor(message: string, url: string, body?: any) {
    super(19, message, url, body);
  }
}
export class HosterNotAvailableForFreeUsersError extends ApiError {
  public static readonly code: 20 = 20;
  public constructor(message: string, url: string, body?: any) {
    super(20, message, url, body);
  }
}
export class TooManyActiveDownloadsError extends ApiError {
  public static readonly code: 21 = 21;
  public constructor(message: string, url: string, body?: any) {
    super(21, message, url, body);
  }
}
export class IPAddressNotAllowedError extends ApiError {
  public static readonly code: 22 = 22;
  public constructor(message: string, url: string, body?: any) {
    super(22, message, url, body);
  }
}
export class TrafficExhaustedError extends ApiError {
  public static readonly code: 23 = 23;
  public constructor(message: string, url: string, body?: any) {
    super(23, message, url, body);
  }
}
export class FileUnavailableError extends ApiError {
  public static readonly code: 24 = 24;
  public constructor(message: string, url: string, body?: any) {
    super(24, message, url, body);
  }
}
export class ServiceUnavailableError extends ApiError {
  public static readonly code: 25 = 25;
  public constructor(message: string, url: string, body?: any) {
    super(25, message, url, body);
  }
}
export class UploadTooBigError extends ApiError {
  public static readonly code: 26 = 26;
  public constructor(message: string, url: string, body?: any) {
    super(26, message, url, body);
  }
}
export class UploadErrorError extends ApiError {
  public static readonly code: 27 = 27;
  public constructor(message: string, url: string, body?: any) {
    super(27, message, url, body);
  }
}
export class FileNotAllowedError extends ApiError {
  public static readonly code: 28 = 28;
  public constructor(message: string, url: string, body?: any) {
    super(28, message, url, body);
  }
}
export class TorrentTooBigError extends ApiError {
  public static readonly code: 29 = 29;
  public constructor(message: string, url: string, body?: any) {
    super(29, message, url, body);
  }
}
export class TorrentFileInvalidError extends ApiError {
  public static readonly code: 30 = 30;
  public constructor(message: string, url: string, body?: any) {
    super(30, message, url, body);
  }
}
export class ActionAlreadyDoneError extends ApiError {
  public static readonly code: 31 = 31;
  public constructor(message: string, url: string, body?: any) {
    super(31, message, url, body);
  }
}
export class ImageResolutionError extends ApiError {
  public static readonly code: 32 = 32;
  public constructor(message: string, url: string, body?: any) {
    super(32, message, url, body);
  }
}
export class TorrentAlreadyActiveError extends ApiError {
  public static readonly code: 33 = 33;
  public constructor(message: string, url: string, body?: any) {
    super(33, message, url, body);
  }
}
// prettier-ignore-end
type ErrorType =
  | InternalError
  | MissingParameterError
  | BadParameterValueError
  | UnknownMethodError
  | MethodNotAllowedError
  | SlowDownError
  | RessourceUnreachableError
  | ResourceNotFoundError
  | BadTokenError
  | PermissionDeniedError
  | TwoFactorAuthenticationNeededError
  | TwoFactorAuthenticationPendingError
  | InvalidLoginError
  | InvalidPasswordError
  | AccountLockedError
  | AccountNotActivatedError
  | UnsupportedHosterError
  | HosterInMaintenanceError
  | HosterLimitReachedError
  | HosterTemporarilyUnavailableError
  | HosterNotAvailableForFreeUsersError
  | TooManyActiveDownloadsError
  | IPAddressNotAllowedError
  | TrafficExhaustedError
  | FileUnavailableError
  | ServiceUnavailableError
  | UploadTooBigError
  | UploadErrorError
  | FileNotAllowedError
  | TorrentTooBigError
  | TorrentFileInvalidError
  | ActionAlreadyDoneError
  | ImageResolutionError
  | TorrentAlreadyActiveError;
export const errorCodes = {
  [-1]: InternalError,
  [1]: MissingParameterError,
  [2]: BadParameterValueError,
  [3]: UnknownMethodError,
  [4]: MethodNotAllowedError,
  [5]: SlowDownError,
  [6]: RessourceUnreachableError,
  [7]: ResourceNotFoundError,
  [8]: BadTokenError,
  [9]: PermissionDeniedError,
  [10]: TwoFactorAuthenticationNeededError,
  [11]: TwoFactorAuthenticationPendingError,
  [12]: InvalidLoginError,
  [13]: InvalidPasswordError,
  [14]: AccountLockedError,
  [15]: AccountNotActivatedError,
  [16]: UnsupportedHosterError,
  [17]: HosterInMaintenanceError,
  [18]: HosterLimitReachedError,
  [19]: HosterTemporarilyUnavailableError,
  [20]: HosterNotAvailableForFreeUsersError,
  [21]: TooManyActiveDownloadsError,
  [22]: IPAddressNotAllowedError,
  [23]: TrafficExhaustedError,
  [24]: FileUnavailableError,
  [25]: ServiceUnavailableError,
  [26]: UploadTooBigError,
  [27]: UploadErrorError,
  [28]: FileNotAllowedError,
  [29]: TorrentTooBigError,
  [30]: TorrentFileInvalidError,
  [31]: ActionAlreadyDoneError,
  [32]: ImageResolutionError,
  [33]: TorrentAlreadyActiveError,
};
export interface ErrorResponse {
  error: string;
  error_code: keyof typeof errorCodes;
}

export function getApiError<TCode extends keyof typeof errorCodes>(
  code: TCode,
): new (message: string, url: string, body?: any) => ErrorType {
  return errorCodes[code];
}
