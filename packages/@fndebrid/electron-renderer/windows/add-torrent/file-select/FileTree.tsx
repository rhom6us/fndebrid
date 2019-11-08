import {Classes, ITreeNode, Tree} from '@blueprintjs/core';
import {File, FileId} from '@fndebrid/real-debrid';
import {difference, union} from 'lodash';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {buildTree, FnTreeNode, TreeNodeId} from './models';

export interface FileTreeProps {
  files: File[];
  selections: FileId[];
  onSelectionsChanged: (fileIds: FileId[]) => void;
}

export const FileTree: FC<FileTreeProps> = ({files, selections, onSelectionsChanged}) => {
  // tslint:disable-next-line: variable-name
  const [_expansions, setExpansions] = useState(new Set<TreeNodeId>());

  const rootNode = useMemo(() => buildTree(files, selections, _expansions), [files, selections, _expansions]);

  const handleNodeClick = useCallback(
    (node: FnTreeNode, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
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
