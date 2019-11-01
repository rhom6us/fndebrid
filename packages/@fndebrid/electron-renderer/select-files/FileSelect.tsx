import {Button, H1} from '@blueprintjs/core';
import {ExtendedTorrent, FileId} from '@fndebrid/real-debrid';
import React, {useRef, useState} from 'react';
import {Dialog} from '../add-magnet/components';
import FileTree, {FileTreeInputHandles} from './FileTree';

interface IOwnProps {
  torrent: ExtendedTorrent;
  caches: FileId[][] | undefined;
  onSubmit: (files: FileId[]) => void;
  onCancel: () => void;
}
export const FileSelect: React.FC<IOwnProps> = ({torrent, caches, onSubmit, onCancel}) => {
  const fileTreeRef = useRef<FileTreeInputHandles>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<FileId[]>([]);
  function submit() {
    onSubmit(selectedFileIds);
  }
  function selectCache(index: number) {
    fileTreeRef.current!.setSelections(caches![index]);
  }
  return (
    <>
      <Dialog.Body>
        <H1>File Select</H1>
        {caches && (
          <ul style={{display: 'inline'}}>
            {caches.map((cache, index) => (
              <li style={{display: 'inline'}}>
                <a onClick={() => selectCache(index)}>Cache {index} </a>
              </li>
            ))}
          </ul>
        )}
        <FileTree files={torrent.files} onSelectionChanged={setSelectedFileIds} ref={fileTreeRef} />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Footer.Actions>
          <Button rightIcon='upload' intent='primary' disabled={!selectedFileIds.length} onClick={submit}>
            Submit
          </Button>
          <Button rightIcon='small-cross' text='Cancel' onClick={onCancel} />
        </Dialog.Footer.Actions>
      </Dialog.Footer>
    </>
  );
};
