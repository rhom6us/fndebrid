import { Button, H1 } from '@blueprintjs/core';
import React, { useState } from 'react';
import { MaybeExtendedTorrent, FileId } from '@fndebrid/real-debrid';
import { Dialog } from '../add-magnet/components';
import { FileTree } from './FileTree';


interface IOwnProps {
  torrent: MaybeExtendedTorrent,
  onSubmit: (files: FileId[]) => void,
  onCancel: () => void,
}
export const FileSelect: React.FC<IOwnProps> = ({ torrent, onSubmit, onCancel }) => {
  const [selectedFileIds, setSelectedFileIds] = useState<FileId[]>([]);
  function submit() {
    onSubmit(selectedFileIds);
  }
  return (  
    <>
  <Dialog.Body>
    <H1>File Select</H1>
    <FileTree files={torrent.files} onSelectionChanged={setSelectedFileIds} />
    </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Footer.Actions>
          <Button rightIcon="upload" intent="primary" disabled={!selectedFileIds.length} onClick={submit}>Submit</Button>
          <Button rightIcon="small-cross" text="Cancel" onClick={onCancel} />
        </Dialog.Footer.Actions>

      </Dialog.Footer>
    </>
)
};