import React from 'react';
import { groupBy } from 'lodash';
import { ITreeNode } from '@blueprintjs/core';
export type TreeNodeId = string | number;
export type TreeNodeLabel = string | JSX.Element;
let id = 0;
 export abstract class TreeNode<T> implements ITreeNode<T> {
//   static groupIt(array: string[][]): TreeNode<string>[] {
//     const { file, folder } = groupBy(array, p => p.length > 1 ? 'folder' : 'file');

//     const folderMap = groupBy(folder, p => p[0]);

//     const files = file && file.map(p => p[0]).map(p => new FileNode(id++, p, p));
//     const folders = Object.keys(folderMap).map(name => new FolderNode(id++, name, TreeNode.groupIt(folderMap[name].map(p => p.slice(1)))));
//     return [...files, ...folders];
//   }
  //   const preparedPaths = paths.map(p => p.split('/').filter(Boolean));
  //   const results =  groupIt(preparedPaths);

  public abstract readonly childNodes?: TreeNode<T>[];
  public abstract readonly hasCaret?: boolean;
  public abstract readonly nodeData?: T;

   public label: JSX.Element;

   constructor(public readonly id: TreeNodeId, public readonly name: string, public readonly isSelected: boolean, public readonly isExpanded: boolean) { 
     this.label = <div>{this.name}</div>;
  }

  get files() {
    return Array.from(this._files);
  }
  get _files(): Generator<FileNode<T>> {
    return (function* (this: TreeNode<T>) {
      if (this instanceof FileNode) {
        yield this;
        return;
      }
      if (this.childNodes) {
        for (const child of this.childNodes) {
          yield* child._files;
        }
      }
    }).call(this);
  }

  get descendants() {
    return Array.from(this._descendants);
  }
  get _descendants(): Generator<TreeNode<T>> {
    return (function* (this: TreeNode<T>) {
      if (this.childNodes) {
        for (const child of this.childNodes){
          yield* child._descendants;
        }
      }
    }).call(this);
  }
}
export class FolderNode<T> extends TreeNode<T> {
  public hasCaret?: true = true;
  public nodeData?: undefined = undefined;
  // public get label(): TreeNodeLabel {
  //   return 'this.name';
  // }
  public constructor(id: TreeNodeId, name: string, isSelected: boolean, isExpanded: boolean, public readonly childNodes: TreeNode<T>[] = []) {
    super(id, name, isSelected, isExpanded);
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
    return (function* (this: FolderNode<T>) {
      
      if (this.childNodes) {
        for (const child of this.childNodes.filter(node => node instanceof FolderNode) as FolderNode<T>[]) {
          yield* child._folders;
        }
      }

    }).call(this);
  }
}
export class FileNode<T> extends TreeNode<T> {
  public childNodes?: undefined;
  public hasCaret?: undefined;

  // public get label(): TreeNodeLabel {
  //   return this.name;
  // }
  public constructor(id: TreeNodeId, name: string, isSelected: boolean, isExpanded: boolean, public readonly nodeData: T) {
    super(id, name, isSelected, isExpanded);
  }

}