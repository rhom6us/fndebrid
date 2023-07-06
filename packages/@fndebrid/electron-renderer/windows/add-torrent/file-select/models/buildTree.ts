import { File, FileId } from '@fndebrid/real-debrid';
import { includes } from 'lodash';
import { FnTreeNode } from './FnTreeNode';
import { TreeNodeId } from './types';

export function buildTree(fnFiles: File[], selections: FileId[], expansions: Set<TreeNodeId>) {
  let id = 0;
  const rootNode = FnTreeNode.createRoot();

  for (const fnFile of fnFiles) {
    const [file, ...folders] = fnFile.path.split('/').filter(Boolean).reverse();
    let currentFolder = rootNode;
    while (folders.length) {
      const proposedFolderName = folders.pop()!;
      currentFolder =
        currentFolder.find(proposedFolderName) ||
        currentFolder.addFolder(++id, proposedFolderName, expansions.has(id));
    }

    currentFolder.addFile(++id, file, includes(selections, fnFile.id), fnFile);
  }
  return rootNode.finalize();
}
