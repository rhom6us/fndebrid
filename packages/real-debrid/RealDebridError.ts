// tslint:disable: max-classes-per-file
export class RealDebridError extends Error {}
export class InvalidOperationError extends RealDebridError {}
export class ApiError extends RealDebridError {
  constructor(public readonly code: keyof typeof errorCodes, message: string) {
    super(message);
  }
}
export class ArgumentError extends RealDebridError {
  constructor(public readonly name: string, message?: string) {
    super(message);
  }
}
export class ArgumentFalsyError extends ArgumentError {}
export class InvalidArgumentError extends ArgumentError {}
// tslint:disable-next-line: one-variable-per-declaration
const errorCodes: Record<number, any> = {
  [-1]: 'Internal',
  [-1]: class InternalError extends ApiError {
    constructor(message = 'Internal error') {
      super(-1, message);
    }
  },
  [1]: class MissingParameterError extends ApiError {
    constructor(message = 'Missing parameter') {
      super(1, message);
    }
  },
  [2]: class BadParameterValueError extends ApiError {
    constructor(message = 'Bad parameter value') {
      super(2, message);
    }
  },
  [3]: class UnknownMethodError extends ApiError {
    constructor(message = 'Unknown nethod') {
      super(3, message);
    }
  },
  [4]: class MethodNotAllowedError extends ApiError {
    constructor(message = 'Method not allowed') {
      super(4, message);
    }
  },
  [5]: class SlowDownError extends ApiError {
    constructor(message = 'Slow down') {
      super(5, message);
    }
  },
  [6]: class RessourceUnreachableError extends ApiError {
    constructor(message = 'Ressource unreachable') {
      super(6, message);
    }
  },
  [7]: class ResourceNotFoundError extends ApiError {
    constructor(message = 'Resource not found') {
      super(7, message);
    }
  },
  [8]: class BadTokenError extends ApiError {
    constructor(message = 'Bad token') {
      super(8, message);
    }
  },
  [9]: class PermissionDeniedError extends ApiError {
    constructor(message = 'Permission denied') {
      super(9, message);
    }
  },
  [10]: class TwoFactorAuthenticationNeededError extends ApiError {
    constructor(message = 'Two-Factor authentication needed') {
      super(10, message);
    }
  },
  [11]: class TwoFactorAuthenticationPendingError extends ApiError {
    constructor(message = 'Two-Factor authentication pending') {
      super(11, message);
    }
  },
  [12]: class InvalidLoginError extends ApiError {
    constructor(message = 'Invalid login') {
      super(12, message);
    }
  },
  [13]: class InvalidPasswordError extends ApiError {
    constructor(message = 'Invalid password') {
      super(13, message);
    }
  },
  [14]: class AccountLockedError extends ApiError {
    constructor(message = 'Account locked') {
      super(14, message);
    }
  },
  [15]: class AccountNotActivatedError extends ApiError {
    constructor(message = 'Account not activated') {
      super(15, message);
    }
  },
  [16]: class UnsupportedHosterError extends ApiError {
    constructor(message = 'Unsupported hoster') {
      super(16, message);
    }
  },
  [17]: class HosterInMaintenanceError extends ApiError {
    constructor(message = 'Hoster in maintenance') {
      super(17, message);
    }
  },
  [18]: class HosterLimitReachedError extends ApiError {
    constructor(message = 'Hoster limit reached') {
      super(18, message);
    }
  },
  [19]: class HosterTemporarilyUnavailableError extends ApiError {
    constructor(message = 'Hoster temporarily unavailable') {
      super(19, message);
    }
  },
  [20]: class HosterNotAvailableForFreeUsersError extends ApiError {
    constructor(message = 'Hoster not available for free users') {
      super(20, message);
    }
  },
  [21]: class TooManyActiveDownloadsError extends ApiError {
    constructor(message = 'Too many active downloads') {
      super(21, message);
    }
  },
  [22]: class IPAddressNotAllowedError extends ApiError {
    constructor(message = 'IP address not allowed') {
      super(22, message);
    }
  },
  [23]: class TrafficExhaustedError extends ApiError {
    constructor(message = 'Traffic exhausted') {
      super(23, message);
    }
  },
  [24]: class FileUnavailableError extends ApiError {
    constructor(message = 'File unavailable') {
      super(24, message);
    }
  },
  [25]: class ServiceUnavailableError extends ApiError {
    constructor(message = 'Service unavailable') {
      super(25, message);
    }
  },
  [26]: class UploadTooBigError extends ApiError {
    constructor(message = 'Upload too big') {
      super(26, message);
    }
  },
  [27]: class UploadErrorError extends ApiError {
    constructor(message = 'Upload error') {
      super(27, message);
    }
  },
  [28]: class FileNotAllowedError extends ApiError {
    constructor(message = 'File not allowed') {
      super(28, message);
    }
  },
  [29]: class TorrentTooBigError extends ApiError {
    constructor(message = 'Torrent too big') {
      super(29, message);
    }
  },
  [30]: class TorrentFileInvalidError extends ApiError {
    constructor(message = 'Torrent file invalid') {
      super(30, message);
    }
  },
  [31]: class ActionAlreadyDoneError extends ApiError {
    constructor(message = 'Action already done') {
      super(31, message);
    }
  },
  [32]: class ImageResolutionError extends ApiError {
    constructor(message = 'Image resolution') {
      super(32, message);
    }
  },
  [33]: class TorrentAlreadyActiveError extends ApiError {
    constructor(message = 'Torrent already active') {
      super(33, message);
    }
  },
};
export default errorCodes;
