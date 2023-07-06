import { ITreeNode } from '@blueprintjs/core';
import { File } from '@fndebrid/real-debrid';
import { createElement } from 'react';
import { formatBytes } from '../util';
import { TreeNodeId, TreeNodeLabel } from './types';

// tslint:disable: max-classes-per-file
export abstract class FnTreeNode implements ITreeNode<File>, Iterable<FnTreeNode> {
  public static createRoot() {
    return new FnFolderNode(-1, 'root', false);
  }

  public abstract readonly childNodes?: FnTreeNode[];
  public abstract readonly hasCaret: boolean;
  public abstract readonly nodeData?: File;
  public abstract readonly isExpanded: boolean;
  public abstract readonly isSelected: boolean;
  public abstract label: TreeNodeLabel;
  protected constructor(
    public readonly id: TreeNodeId,
    protected readonly name: string,
  ) {}
  public get files() {
    return Array.from(this._files);
  }
  private get _files(): Iterable<FnFileNode> {
    return function* (this: FnTreeNode) {
      for (const child of this) {
        if (child instanceof FnFileNode) {
          yield child;
        }
      }
    }.call(this);
  }
  public *[Symbol.iterator](): Iterator<FnTreeNode> {
    yield this;
    if (this.childNodes) {
      for (const child of this.childNodes) {
        yield* child;
      }
    }
  }
}

export class FnFileNode extends FnTreeNode {
  public readonly childNodes?: undefined;
  public readonly hasCaret = false;
  public readonly isExpanded = false;
  public readonly label: JSX.Element;
  constructor(
    id: TreeNodeId,
    name: string,
    public readonly isSelected: boolean,
    public readonly nodeData: File,
  ) {
    super(id, name);
    this.label = createElement(
      'div',
      null,
      name,
      createElement('small', null, `(${formatBytes(nodeData.bytes)})`),
    );
  }
}

export class FnFolderNode extends FnTreeNode {
  public readonly hasCaret = true;
  public readonly nodeData?: undefined;
  public isSelected = false;
  public label: JSX.Element;
  constructor(
    id: TreeNodeId,
    name: string,
    public readonly isExpanded: boolean,
    public readonly childNodes: FnTreeNode[] = [],
  ) {
    super(id, name);
    this.label = createElement('div', null, name);
  }
  // this dumb function is here bc the TreeView component I'm using can't read get properties, so I have to do this instead...
  public finalize() {
    this.folders.forEach(folder => {
      if (folder.files.every(file => file.isSelected)) {
        folder.isSelected = true;
      }
    });
    const size = this.files.map(file => file.nodeData.bytes).reduce((sum, size) => sum + size, 0);
    this.label = createElement(
      'div',
      null,
      this.name,
      createElement('small', null, `(${formatBytes(size)})`),
    );
    return this;
  }
  public get folders() {
    return Array.from(this._folders);
  }
  private get _folders(): Generator<FnFolderNode> {
    return function* (this: FnFolderNode) {
      for (const child of this) {
        if (child instanceof FnFolderNode) {
          yield child;
        }
      }
    }.call(this);
  }
  public find(name: string): FnFolderNode | undefined {
    return this.folders.filter(p => p.name === name)[0];
  }
  public addChild<U extends FnTreeNode>(child: U) {
    this.childNodes.push(child);
    return child;
  }
  public addFolder(id: number, name: string, expanded: boolean): FnFolderNode {
    return this.addChild(new FnFolderNode(id, name, expanded));
  }
  public addFile(id: number, name: string, selected: boolean, data: File) {
    return this.addChild(new FnFileNode(id, name, selected, data));
  }
}
