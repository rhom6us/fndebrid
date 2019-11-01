import {Classes, ITreeNode, Tree} from '@blueprintjs/core';
import {File, FileId} from '@fndebrid/real-debrid';
import {difference, includes, union} from 'lodash';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {TreeNode as FnTreeNode, TreeNodeId} from './TreeNode';

export interface FileTreeProps {
  files: File[];
  selections: FileId[];
  onSelectionsChanged: (fileIds: FileId[]) => void;
}

function buildTree(fnFiles: File[], selections: FileId[], expansions: Set<TreeNodeId>) {
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
        currentFolder.find(proposedFolderName) || currentFolder.addFolder(++id, proposedFolderName, expansions.has(id));
    }

    currentFolder.addFile(++id, file, includes(selections, fnFile.id), fnFile);
  }
  return rootNode.finalize();
}
const FileTree: FC<FileTreeProps> = ({files, selections, onSelectionsChanged}) => {
  // tslint:disable-next-line: variable-name
  const [_expansions, setExpansions] = useState(new Set<TreeNodeId>());

  const rootNode = useMemo(() => buildTree(files, selections, _expansions), [files, selections, _expansions]);

  const handleNodeClick = useCallback(
    (node: FnTreeNode<File>, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
      const selected = !!!node.isSelected;
      const allDescendants = node.files.map(file => file.nodeData.id);
      if (selected) {
        onSelectionsChanged(union(selections, allDescendants));
      } else {
        onSelectionsChanged(difference(selections, allDescendants));
      }
    },
    [selections, onSelectionsChanged],
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
export default FileTree;
