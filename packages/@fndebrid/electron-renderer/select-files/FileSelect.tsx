import {Button, H1} from '@blueprintjs/core';
import {ExtendedTorrent, FileId} from '@fndebrid/real-debrid';
import React, {useCallback, useRef, useState} from 'react';
import {Dialog} from '../add-magnet/components';
import FileTree from './FileTree';

interface IOwnProps {
  torrent: ExtendedTorrent;
  caches: FileId[][] | undefined;
  onSubmit: (files: FileId[]) => void;
  onCancel: () => void;
}
export const FileSelect: React.FC<IOwnProps> = ({torrent, caches, onSubmit, onCancel}) => {
  const [selections, setSelections] = useState<FileId[]>([]);
  const submit = useCallback(() => {
    onSubmit(selections);
  }, [onSubmit, selections]);

  const selectCache = useCallback(
    (index: number) => {
      setSelections(caches![index]);
    },
    [caches],
  );
  return (
    <>
      <Dialog.Body>
        <H1>File Select</H1>
        {!caches && <p>loading caches...</p>}
        {caches && !caches.length && <p>no cache available</p>}
        {caches && caches.length && (
          <ul>
            {caches.map((cache, index) => (
              <li style={{display: 'inline'}}>
                <a onClick={() => selectCache(index)}>Cache {index} </a>
              </li>
            ))}
          </ul>
        )}
        <FileTree files={torrent.files} onSelectionsChanged={setSelections} selections={selections} />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Footer.Actions>
          <Button rightIcon='upload' intent='primary' disabled={!selections.length} onClick={submit}>
            Submit
          </Button>
          <Button rightIcon='small-cross' text='Cancel' onClick={onCancel} />
        </Dialog.Footer.Actions>
      </Dialog.Footer>
    </>
  );
};
