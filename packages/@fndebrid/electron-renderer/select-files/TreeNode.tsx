import {ITreeNode} from '@blueprintjs/core';
import React from 'react';
import {formatBytes} from './util';

// tslint:disable: max-classes-per-file
export type TreeNodeId = string | number;
export type TreeNodeLabel = string | JSX.Element;

export abstract class TreeNode<T> implements ITreeNode<T>, Iterable<TreeNode<T>> {
  public static createRoot<T>() {
    return new FolderNode<T>(-1, 'root', false);
  }

  public abstract readonly childNodes?: Array<TreeNode<T>>;
  public abstract readonly hasCaret: boolean;
  public abstract readonly nodeData?: T;
  public abstract readonly isExpanded: boolean;
  public abstract readonly isSelected: boolean;

  public label: JSX.Element;

  protected constructor(public readonly id: TreeNodeId, public readonly name: string) {
    this.label = <div>{this.name}</div>;
  }

  get files() {
    return Array.from(this._files);
  }
  get _files(): Iterable<FileNode<T>> {
    return function*(this: TreeNode<T>) {
      for (const child of this) {
        if (child instanceof FileNode) {
          yield child;
        }
      }
    }.call(this);
  }

  public *[Symbol.iterator](): Iterator<TreeNode<T>> {
    yield this;
    if (this.childNodes) {
      for (const child of this.childNodes) {
        yield* child;
      }
    }
  }
}
export class FolderNode<T> extends TreeNode<T> {
  public readonly hasCaret = true;
  public readonly nodeData?: undefined;
  public isSelected = false;
  constructor(
    id: TreeNodeId,
    name: string,
    public readonly isExpanded: boolean,
    public readonly childNodes: Array<TreeNode<T>> = [],
  ) {
    super(id, name);
  }
  // this dumb function is here bc the TreeView component I'm using can't read get properties, so I have to do this instead...
  public finalize() {
    this.folders.forEach(folder => {
      if (folder.files.every(file => file.isSelected)) {
        folder.isSelected = true;
      }
    });
    return this;
  }

  get folders() {
    return Array.from(this._folders);
  }
  get _folders(): Generator<FolderNode<T>> {
    return function*(this: FolderNode<T>) {
      for (const child of this) {
        if (child instanceof FolderNode) {
          yield child;
        }
      }
    }.call(this);
  }
  public find(name: string): FolderNode<T> | undefined {
    return this.folders.filter(p => p.name === name)[0];
  }
  public addChild<U extends TreeNode<T>>(child: U) {
    this.childNodes.push(child);
    return child;
  }
  public addFolder(id: number, name: string, expanded: boolean) {
    return this.addChild(new FolderNode<T>(id, name, expanded));
  }
  public addFile(id: number, name: string, selected: boolean, data: T, size: number) {
    return this.addChild(new FileNode<T>(id, name, selected, data, size));
  }
}
export class FileNode<T> extends TreeNode<T> {
  public readonly childNodes?: undefined;
  public readonly hasCaret = false;
  public readonly isExpanded = false;
  constructor(
    id: TreeNodeId,
    name: string,
    public readonly isSelected: boolean,
    public readonly nodeData: T,
    size: number,
  ) {
    super(id, name);
    this.label = (
      <div>
        {this.name} <small>({formatBytes(size)})</small>
      </div>
    );
  }
}
