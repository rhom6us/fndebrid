import React, {useMemo, useState, useEffect} from 'react';
import {connect, useStore} from 'react-redux';
import uuid5 from 'uuid/v5';

import {FileId, MagnetLink, Torrent, TorrentId, ExtendedTorrent} from '@fndebrid/real-debrid';
import {State, getDispatcher, Dispatch} from '@fndebrid/store';
import {JobId, jobId} from '@fndebrid/store/torrents/state';

import {assertNever} from '@fndebrid/core/utils';
import AddMagnet from './add-magnet';
import {FileSelect} from './select-files';
import {Dialog} from './add-magnet/components';
const params = new URL(window.location.href).searchParams;
const initialJobId = params.get('jobid') as JobId;
const intitialTorrentId = params.get('torrentid') as TorrentId;

interface IOwnProps {}
function mapStateToProps(state: State, ownProps: IOwnProps) {
  return {
    jobs: state.torrents.jobs,
    torrents: state.torrents.entities.torrents,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IOwnProps) {
  const dispatcher = getDispatcher(dispatch);
  return {
    addMagnet(magnet: MagnetLink, jobId: JobId) {
      dispatcher.addMagnet.request([magnet, jobId]);
    },
    cancelJob: dispatcher.cancelJob,
    completeJob: dispatcher.completeJob,
    selectFiles: dispatcher.selectFiles,
    deleteTorrent: dispatcher.deleteTorrent.request,
  };
}
type IDispatchProps = ReturnType<typeof mapDispatchToProps>;
type IStateProps = ReturnType<typeof mapStateToProps>;

type Props = IStateProps & IDispatchProps & IOwnProps;

function getBody(
  jobs: Record<JobId, TorrentId>,
  jobId: JobId | undefined,
  torrentId: TorrentId | undefined,
  torrent: Torrent | undefined,
) {
  if (!torrentId) {
    if (!jobId) {
      return 'add_magnet';
    }
    return 'uploading';
  }
  if (!torrent) {
    return 'fetching';
  }
  switch (torrent.status) {
    case 'magnet_conversion':
    case 'magnet_error':
      return torrent.status;
    case 'waiting_files_selection':
      if (jobId && jobId in jobs) {
        return torrent.status;
      }
      return 'submitting_selection';
    default:
      return 'complete';
  }
}
export const AddTorrent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({addMagnet, cancelJob, completeJob, deleteTorrent, selectFiles, jobs, torrents}: Props) => {
  const [jobId, setJobId] = useState(initialJobId);
  const [aquiredTorrentId, setAquiredTorrentId] = useState(intitialTorrentId);
  const torrentId = useMemo(() => aquiredTorrentId || jobs[jobId], [aquiredTorrentId, jobs, jobId]);
  const torrent = useMemo(() => torrents[torrentId], [torrents, torrentId]);
  useEffect(() => {
    if (torrentId && !aquiredTorrentId) {
      setAquiredTorrentId(torrentId);
      console.log('setAquiredTorrentId', torrentId);
    }
  }, [torrentId, aquiredTorrentId]);
  useEffect(() => {
    window.addEventListener('close', cancelSetup);
    return () => window.removeEventListener('close', cancelSetup);
  });

  function submitMagnet(magnet: MagnetLink) {
    const jobId = uuid5(magnet, uuid5.URL) as JobId;
    addMagnet(magnet, jobId);
    setJobId(jobId);
  }
  function submitFileSelection(files: FileId[]) {
    selectFiles.request([torrentId, files]);
    completeJob(jobId);
  }
  function cancelDownload() {
    if (torrentId) {
      deleteTorrent(torrentId);
    }
    cancelSetup();
  }
  function cancelSetup() {
    if (jobId) {
      cancelJob(jobId);
    }
    window.close();
  }

  const displayMode = useMemo(() => getBody(jobs, jobId, torrentId, torrent), [jobs, jobId, torrentId, torrent]);
  return (
    <Dialog title='fn Debrid' onClose={cancelSetup}>
      {(() => {
        switch (displayMode) {
          case 'add_magnet':
            return <AddMagnet onSubmit={submitMagnet} onCancel={cancelDownload} />;
          case 'uploading':
            return <h3>Uploading your magnet to real-debrid.com...</h3>;
          case 'magnet_conversion':
            return <h3>Converting your magnet...</h3>;
          case 'magnet_error':
            return <h3>Looks like this magnet isn't working right now. Try again later.</h3>;
          case 'fetching':
            return <h3>Fetching torrent details...</h3>;
          case 'waiting_files_selection':
            return <FileSelect torrent={torrent} onSubmit={submitFileSelection} onCancel={cancelDownload} />;
          case 'submitting_selection':
            return <h3>Submitting your file selection to real-debrid.com...</h3>;
          case 'complete':
            return <h3>Submitted</h3>;
          default:
            return assertNever(displayMode);
        }
      })()}
    </Dialog>
  );
});
