import { OperationFailedError } from '@fndebrid/core';

export abstract class Associator {
  abstract get isAssociated(): boolean;
  protected abstract _associate(): void;
  protected abstract _disassociate(): void;
  public associate(associate: boolean = true): void {
    if (!associate)
      return this.disassociate();
    if (this.isAssociated)
      return;
    this._associate();
    if (!this.isAssociated)
      throw new OperationFailedError(`${this.constructor.name} failed to associate`);
  }
  ;
  public disassociate(): void {
    if (!this.isAssociated)
      return;
    this._disassociate();
    if (this.isAssociated)
      throw new OperationFailedError(`${this.constructor.name} failed to disassociate`);
  }
}
