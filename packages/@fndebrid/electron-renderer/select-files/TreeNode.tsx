import React from 'react';
import {groupBy} from 'lodash';
import {ITreeNode} from '@blueprintjs/core';
export type TreeNodeId = string | number;
export type TreeNodeLabel = string | JSX.Element;
let id = 0;
export abstract class TreeNode<T> implements ITreeNode<T>, Iterable<TreeNode<T>> {
  //   static groupIt(array: string[][]): TreeNode<string>[] {
  //     const { file, folder } = groupBy(array, p => p.length > 1 ? 'folder' : 'file');

  //     const folderMap = groupBy(folder, p => p[0]);

  //     const files = file && file.map(p => p[0]).map(p => new FileNode(id++, p, p));
  //     const folders = Object.keys(folderMap).map(name => new FolderNode(id++, name, TreeNode.groupIt(folderMap[name].map(p => p.slice(1)))));
  //     return [...files, ...folders];
  //   }
  //   const preparedPaths = paths.map(p => p.split('/').filter(Boolean));
  //   const results =  groupIt(preparedPaths);
  public static createRoot<T>() {
    return new FolderNode<T>(-1, 'root', false, false);
  }

  public abstract readonly childNodes?: TreeNode<T>[];
  public abstract readonly hasCaret: boolean;
  public abstract readonly nodeData?: T;
  public abstract readonly isExpanded: boolean;

  public label: JSX.Element;

  protected constructor(
    public readonly id: TreeNodeId,
    public readonly name: string,
    public readonly isSelected: boolean,
  ) {
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
      // if (this instanceof FileNode) {
      //   yield this;
      //   return;
      // }
      // if (this.childNodes) {
      //   for (const child of this.childNodes) {
      //     yield* child._files;
      //   }
      // }
    }.call(this);
  }

  // get descendants() {
  //   return Array.from(this._descendants);
  // }
  *[Symbol.iterator](): Iterator<TreeNode<T>> {
    yield this;
    if (this.childNodes) {
      for (const child of this.childNodes) {
        yield* child;
      }
    }
  }
  // get _descendants(): Iterable<TreeNode<T>> {
  //   const tree = this;
  //   return ({
  //     *[Symbol.iterator]() {
  //       if (tree.childNodes) {
  //         for (const child of tree.childNodes) {
  //           yield* child._descendants;
  //         }
  //       }
  //     }
  //   });
  // return (function* (this: TreeNode<T>) {
  //   if (this.childNodes) {
  //     for (const child of this.childNodes) {
  //       yield* child._descendants;
  //     }
  //   }
  // }).call(this);
  // }
}
export class FolderNode<T> extends TreeNode<T> {
  public readonly hasCaret = true;
  public readonly nodeData?: undefined;
  // public get label(): TreeNodeLabel {
  //   return 'this.name';
  // }
  constructor(
    id: TreeNodeId,
    name: string,
    isSelected: boolean,
    public readonly isExpanded: boolean,
    public readonly childNodes: TreeNode<T>[] = [],
  ) {
    super(id, name, isSelected);
  }
  // public get isSelected() {
  //   return this.childNodes.every(p => p.isSelected);
  // }
  // public set isSelected(value) {
  //   this.childNodes.forEach(p => p.isSelected = true);
  // }
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

      // if (this.childNodes) {
      //   for (const child of this.childNodes.filter(node => node instanceof FolderNode) as FolderNode<T>[]) {
      //     yield* child._folders;
      //   }
      // }
    }.call(this);
  }
  find(name: string): FolderNode<T> | undefined {
    return this.folders.filter(p => p.name === name)[0];
  }
  addChild<U extends TreeNode<T>>(child: U) {
    this.childNodes.push(child);
    return child;
  }
  addFolder(id: number, name: string, selected: boolean, expanded: boolean) {
    return this.addChild(new FolderNode<T>(id, name, selected, expanded));
  }
  addFile(id: number, name: string, selected: boolean, data: T) {
    return this.addChild(new FileNode<T>(id, name, selected, data));
  }
}
export class FileNode<T> extends TreeNode<T> {
  public readonly childNodes?: undefined;
  public readonly hasCaret = false;
  public readonly isExpanded = false;

  // public get label(): TreeNodeLabel {
  //   return this.name;
  // }
  constructor(id: TreeNodeId, name: string, isSelected: boolean, public readonly nodeData: T) {
    super(id, name, isSelected);
  }
}
