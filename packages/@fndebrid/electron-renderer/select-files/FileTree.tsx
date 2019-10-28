import React, { useMemo, useState } from 'react';
import { TreeNode as FnTreeNode, FolderNode as FnFolderNode, FileNode as FnFileNode, TreeNodeId, FolderNode } from './TreeNode';
import { ITreeNode, Tree, Classes, Button } from '@blueprintjs/core';
import { FileId, File } from '@fndebrid/real-debrid';
import { groupBy, isEqual } from 'lodash';
interface IOwnProps {
  files: File[] | undefined;
  onSelectionChanged: (fileIds: FileId[]) => void;
}
function buildTree(fnFiles: File[], selections: Set<TreeNodeId>, expansions: Set<TreeNodeId>) {
  let id = 0;
  const rootNode = FnTreeNode.createRoot<File>();
  for (const fnFile of fnFiles) {
    const [file, ...folders] = fnFile.path.split('/').filter(Boolean).reverse();
    let currentFolder = rootNode;
    while (folders.length) {
      const proposedFolderName = folders.pop()!;
      currentFolder = currentFolder.find(proposedFolderName) || currentFolder.addFolder(++id, proposedFolderName, selections.has(id), expansions.has(id));
    }
    currentFolder.addFile(++id, file, selections.has(id), fnFile);
  }
  return rootNode;
}
export const FileTree: React.FC<IOwnProps> = ({ files, onSelectionChanged }) => {
  const [selections, setSelections] = useState(new Set<TreeNodeId>());
  const [expansions, setExpansions] = useState(new Set<TreeNodeId>());
  const [lastEmittedSelectionSet, setLastEmittedSelectionSet] = useState<FileId[]>([]);
  if (!files) {
    return <h5>loading...</h5>;
  }
  const rootNode = useMemo(() => buildTree(files, selections, expansions), [files, selections, expansions]);

  const isSelected = (node: ITreeNode) => selections.has(node.id);
  const selectNode = (node: ITreeNode) => selections.add(node.id);
  const unselectNode = (node: ITreeNode) => selections.delete(node.id);

  function handleNodeClick(node: FnTreeNode<File>, _nodePath: number[], e: React.MouseEvent<HTMLElement>) {
    const selected = !!!node.isSelected;
    if (selected) {
      for (const { id } of node) {
        selections.add(id);
      }
      // selections.add(node.id);
      // node.descendants.forEach(({ id }) => selections.add(id));
    } else {
      for (const { id } of node) {
        selections.delete(id);
      }
      // selections.delete(node.id);
      // node.descendants.forEach(({ id }) => selections.delete(id));
    }
    const { selectedFolders, unselectedFolders } = groupBy(rootNode.folders, folder => selections.has(folder.id) ? 'selectedFolders' : 'unselectedFolders');
    unselectedFolders && unselectedFolders
      .filter(folder => folder.files.every(isSelected))
      .forEach(selectNode);
    selectedFolders && selectedFolders
      .filter(folder => !folder.files.every(isSelected))
      .forEach(unselectNode);

    setSelections(new Set(selections));
    const selectedFileIds = rootNode.files.filter(node => selections.has(node.id)).map(node => node.nodeData.id);
    if (!isEqual(selectedFileIds, lastEmittedSelectionSet)) {
      onSelectionChanged(selectedFileIds)
      setLastEmittedSelectionSet(selectedFileIds);
    }
  }

  function handleNodeCollapse(node: ITreeNode) {
    expansions.delete(node.id);
    setExpansions(new Set(expansions));
  }

  function handleNodeExpand(node: ITreeNode) {
    expansions.add(node.id);
    setExpansions(new Set(expansions));
  }

  return (

    <Tree
      contents={rootNode.childNodes}
      onNodeClick={handleNodeClick as any}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />

  );
}
