import { TorrentId } from '@fndebrid/real-debrid';
import React, { useState } from 'react';
import { useCommand, useEventSource } from '../../hooks';

// tslint:disable-next-line: no-empty-interface
interface Props {}


export const Demo: React.FC<Props> = () => {
  const { downloadLocation, torrents } = useEventSource(state => ({
    downloadLocation: state.preferences.downloadLocation,
    torrents: state.realDebrid.torrents,
  }));
  const [pendingValue, setPendingValue] = useState(downloadLocation);
  const { loadTorrents, setDownloadLocation } = useCommand(cmd => ({
    loadTorrents: cmd.realDebrid.fetchAllTorrents,
    setDownloadLocation: cmd.preferences.chooseDownloadLocation
  }));
  const submitChange = () => {
    setDownloadLocation();
  };
  return (
    <div>
      <h2>download location is {downloadLocation}</h2>
      <hr />
      <input type='text' value={pendingValue} onChange={event => setPendingValue(event.target.value)} />
      <button disabled={pendingValue === downloadLocation} onClick={submitChange}>
        {' '}
        submit{' '}
      </button>
      <hr />
      <button onClick={() => loadTorrents()}>load</button>
      <h1>{torrents.length}</h1>
      {/* <hr/>
    <pre>
      {JSON.stringify(props)}
    </pre> */}
    </div>
  );
};
