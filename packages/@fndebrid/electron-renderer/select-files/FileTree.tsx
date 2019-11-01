import {Classes, ITreeNode, Tree} from '@blueprintjs/core';
import {File, FileId} from '@fndebrid/real-debrid';
import {groupBy} from 'lodash';
import React, {forwardRef, RefForwardingComponent, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import {TreeNode as FnTreeNode, TreeNodeId} from './TreeNode';

export interface FileTreeProps {
  files: File[];
  onSelectionChanged: (fileIds: FileId[]) => void;
}
export interface FileTreeInputHandles {
  setSelections(ids: FileId[]): void;
}
function buildTree(fnFiles: File[], selections: Set<TreeNodeId>, expansions: Set<TreeNodeId>) {
  let id = 0;
  const rootNode = FnTreeNode.createRoot<File>();
  for (const fnFile of fnFiles) {
    const [file, ...folders] = fnFile.path
      .split('/')
      .filter(Boolean)
      .reverse();
    let currentFolder = rootNode;
    while (folders.length) {
      const proposedFolderName = folders.pop()!;
      currentFolder =
        currentFolder.find(proposedFolderName) ||
        currentFolder.addFolder(++id, proposedFolderName, selections.has(id), expansions.has(id));
    }
    currentFolder.addFile(++id, file, selections.has(id), fnFile);
  }
  return rootNode;
}
const FileTree: RefForwardingComponent<FileTreeInputHandles, FileTreeProps> = ({files, onSelectionChanged}, ref) => {
  // tslint:disable-next-line: variable-name
  const [_selections, _setSelections] = useState(new Set<TreeNodeId>());
  // tslint:disable-next-line: variable-name
  const [_expansions, setExpansions] = useState(new Set<TreeNodeId>());

  const rootNode = useMemo(() => buildTree(files, _selections, _expansions), [files, _selections, _expansions]);

  const setSelections = useCallback(
    (fn: (selections: Set<TreeNodeId>) => Set<TreeNodeId>) => {
      _setSelections(s => {
        const selections = fn(s);

        const {selectedFolders, unselectedFolders} = groupBy(rootNode.folders, folder =>
          selections.has(folder.id) ? 'selectedFolders' : 'unselectedFolders',
        );
        // tslint:disable-next-line: no-unused-expression
        unselectedFolders &&
          unselectedFolders
            .filter(folder => folder.files.every(node => selections.has(node.id)))
            .forEach(node => selections.add(node.id));
        // tslint:disable-next-line: no-unused-expression
        selectedFolders &&
          selectedFolders
            .filter(folder => !folder.files.every(node => selections.has(node.id)))
            .forEach(node => selections.delete(node.id));

        const selectedFileIds = rootNode.files.filter(node => selections.has(node.id)).map(node => node.nodeData.id);
        onSelectionChanged(selectedFileIds);
        return new Set(selections);
      });
    },
    [rootNode, _setSelections, onSelectionChanged],
  );

  useImperativeHandle(
    ref,
    () => ({
      setSelections(ids) {
        const files = rootNode.files;
        // tslint:disable-next-line: triple-equals
        const selectedNodeIds = ids.map(sel => files.filter(file => file.nodeData.id == sel)[0].id);
        setSelections(_ => new Set(selectedNodeIds));
      },
    }),
    [setSelections, rootNode.files],
  );

  const handleNodeClick = useCallback(
    (node: FnTreeNode<File>, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
      const selected = !!!node.isSelected;
      setSelections(selections => {
        if (selected) {
          //   return selections.with(node.id);
          // }
          // return selections.without(node.id);
          for (const {id} of node) {
            selections.add(id);
          }
        } else {
          for (const {id} of node) {
            selections.delete(id);
          }
        }
        return selections;
      });
    },
    [setSelections],
  );

  const handleNodeCollapse = useCallback((node: ITreeNode) => {
    setExpansions(expansions => expansions.without(node.id));
  }, []);

  const handleNodeExpand = useCallback((node: ITreeNode) => {
    setExpansions(expansions => expansions.with(node.id));
  }, []);

  return (
    <Tree
      contents={rootNode.childNodes}
      onNodeClick={handleNodeClick as any}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />
  );
};
export default forwardRef(FileTree);
