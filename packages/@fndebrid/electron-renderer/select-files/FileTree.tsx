import {Classes, ITreeNode, Tree} from '@blueprintjs/core';
import {File, FileId} from '@fndebrid/real-debrid';
import {groupBy} from 'lodash';
import React, {MutableRefObject, useCallback, useEffect, useMemo, useState} from 'react';
import {TreeNode as FnTreeNode, TreeNodeId} from './TreeNode';

interface IOwnProps {
  files: File[];
  onSelectionChanged: (fileIds: FileId[]) => void;
  selectionSetter: MutableRefObject<((ids: FileId[]) => void) | undefined>;
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
export const FileTree: React.FC<IOwnProps> = ({files, onSelectionChanged, selectionSetter}) => {
  // tslint:disable-next-line: variable-name
  const [selections, _setSelections] = useState(new Set<TreeNodeId>());
  const [expansions, setExpansions] = useState(new Set<TreeNodeId>());

  const rootNode = useMemo(() => buildTree(files, selections, expansions), [files, selections, expansions]);

  const setSelections = useCallback(
    (selections: Set<TreeNodeId>) => {
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

      _setSelections(new Set(selections));
      const selectedFileIds = rootNode.files.filter(node => selections.has(node.id)).map(node => node.nodeData.id);
      onSelectionChanged(selectedFileIds);
    },
    [rootNode, _setSelections, onSelectionChanged],
  );

  useEffect(() => {
    selectionSetter.current = sels => {
      const files = rootNode.files;
      // tslint:disable-next-line: triple-equals
      const selectedNodeIds = sels.map(sel => files.filter(file => file.nodeData.id == sel)[0].id);
      setSelections(new Set(selectedNodeIds));
    };
  }, [rootNode, selectionSetter, setSelections]);

  function handleNodeClick(node: FnTreeNode<File>, nodePath: number[], e: React.MouseEvent<HTMLElement>) {
    const selected = !!!node.isSelected;
    if (selected) {
      for (const {id} of node) {
        selections.add(id);
      }
    } else {
      for (const {id} of node) {
        selections.delete(id);
      }
    }
    setSelections(selections);
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
};
