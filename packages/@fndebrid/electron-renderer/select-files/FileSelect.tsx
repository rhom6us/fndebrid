import {Button, H1} from '@blueprintjs/core';
import {ExtendedTorrent, FileId} from '@fndebrid/real-debrid';
import {intersection} from 'lodash';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Dialog} from '../add-magnet/components';
import FileTree from './FileTree';
import {formatBytes} from './util';

interface IOwnProps {
  torrent: ExtendedTorrent;
  caches: FileId[][] | undefined;
  onSubmit: (files: FileId[]) => void;
  onCancel: () => void;
}
export const FileSelect: React.FC<IOwnProps> = ({torrent, caches, onSubmit, onCancel}) => {
  const [selections, setSelections] = useState<FileId[]>([]);
  const totalSize = useMemo(
    () =>
      formatBytes(
        torrent.files.filter(file => selections.includes(file.id)).reduce((sum, file) => sum + file.bytes, 0),
      ),
    [selections, torrent.files],
  );
  const submit = useCallback(() => {
    onSubmit(selections);
  }, [onSubmit, selections]);

  const selectCache = useCallback(
    (index: number) => {
      setSelections(caches![index]);
    },
    [caches],
  );
  const selectedCacheIndex = useMemo(() => {
    if (!caches) return -1;
    return caches.findIndex(
      cache => cache.length === selections.length && intersection(cache, selections).length === cache.length,
    );
  }, [caches, selections]);
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
                {index === selectedCacheIndex ? (
                  <span>Cache {index}&nbsp;</span>
                ) : (
                  <a onClick={() => selectCache(index)}>Cache {index}&nbsp;</a>
                )}
              </li>
            ))}
          </ul>
        )}
        <FileTree files={torrent.files} onSelectionsChanged={setSelections} selections={selections} />
        {totalSize} selected
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
