import React, { useMemo, useState } from 'react';
import { TreeNode as FnTreeNode, FolderNode as FnFolderNode, FileNode as FnFileNode, TreeNodeId, FolderNode } from './TreeNode';
import { ITreeNode, Tree, Classes, Button } from '@blueprintjs/core';
import { FileId, File } from '@fndebrid/real-debrid';
import { groupBy } from 'lodash';
interface IOwnProps {
  files: File[] | undefined;
  onSelectionChanged: (fileIds: FileId[]) => void;
}
function buildTree(fnFiles: File[], selections: Set<TreeNodeId>, expansions: Set<TreeNodeId>) {
  let id = 0;
  const node = new FnFolderNode<File>(++id, 'root', selections.has(id), expansions.has(id));
  for (const fnFile of fnFiles) {
    const [file, ...folders] = fnFile.path.split('/').filter(Boolean).reverse();
    let currentNode = node;
    while (folders.length) {
      const currentFolder = folders.pop();
      let matchingNode = currentNode.folders.filter(p => p.name == currentFolder)[0];
      if (!matchingNode) {
        matchingNode = new FnFolderNode<File>(++id, currentFolder!, selections.has(id), expansions.has(id));
        currentNode.childNodes.push(matchingNode);
      }
      currentNode = matchingNode;
    }
    currentNode.childNodes.push(new FnFileNode(++id, file, selections.has(id), expansions.has(id), fnFile));
  }
  return node;
}
export const FileTree: React.FC<IOwnProps> = ({ files, onSelectionChanged }) => {
  const [selections, setSelections] = useState(new Set<TreeNodeId>());
  const [expansions, setExpansions] = useState(new Set<TreeNodeId>());
  const [lastEmittedSelectionSet, setLastEmittedSelectionSet] = useState<FileId[]>([]);
  if (!files) {
    return <h5>loading...</h5>;
  }
  const rootNode = useMemo(() => buildTree(files, selections, expansions), [files, selections, expansions]);

  function handleNodeClick(node: FnTreeNode<File>, _nodePath: number[], e: React.MouseEvent<HTMLElement>) {
    const selected = !!!node.isSelected;
    if (selected) {
      selections.add(node.id);
      node.descendants.forEach(({ id }) => selections.add(id));
    } else {
      selections.delete(node.id);
      node.descendants.forEach(({ id }) => selections.delete(id));
    }
    const { selectedFolders, unselectedFolders } = groupBy(rootNode.folders, folder => selections.has(folder.id) ? 'selectedFolders' : 'unselectedFolders');
    unselectedFolders && unselectedFolders
      .filter(folder => folder.files.every(file => selections.has(file.id)))
      .forEach(folder => selections.add(folder.id));
    selectedFolders && selectedFolders
      .filter(folder => folder.files.every(file => !selections.has(file.id)))
      .forEach(folder => selections.delete(folder.id));

    setSelections(new Set(selections));
    const selectedFileIds = rootNode.files.filter(node => selections.has(node.id)).map(node => node.nodeData.id);
    if (!isEqual(selectedFileIds, lastEmittedSelectionSet)) {
      onSelectionChanged(selectedFileIds)
      setLastEmittedSelectionSet(selectedFileIds);
    }
  }

  function handleNodeCollapse(node: ITreeNode) {
    expansions.delete(node.id);
    setExpansions(selections);
  }

  function handleNodeExpand(node: ITreeNode) {
    expansions.add(node.id);
    setExpansions(selections);
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