import React, { useMemo, useState, useEffect } from 'react';
import { connect, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import uuid5 from 'uuid/v5';
import { getDispatcher } from '~main/dispatcher';
import { FileId, MagnetLink, TorrentId } from '~main/real-debrid';
import { State } from '~main/store';
import { JobId, jobId, Torrent } from '~main/store/torrents/state';
import { Dialog } from '~renderer/add-magnet/components';
import AddMagnet from '~renderer/add-magnet';
import { FileSelect } from '~renderer/select-files';
import { assertNever } from '~common/utils';
const params = new URL(window.location.href).searchParams;
const initialJobId = params.get('jobid') as JobId;
const intitialTorrentId = params.get('torrentid') as TorrentId;

interface IOwnProps { }
const mapStateToProps = function (state: State, ownProps: IOwnProps) {
  return {
    jobs: state.torrents.jobs,
    torrents: state.torrents.entities.torrents
  };
}
const mapDispatchToProps = function (dispatch: Dispatch, ownProps: IOwnProps) {
  const dispatcher = getDispatcher(dispatch);
  return {
    addMagnet(magnet: MagnetLink, jobId: JobId) {
      dispatcher.addMagnet.request([magnet, jobId]);
    },
    cancelJob: dispatcher.cancelJob,
    completeJob: dispatcher.completeJob,
    selectFiles: dispatcher.selectFiles,
    deleteTorrent: dispatcher.deleteTorrent.request,
  }
}
type IDispatchProps = ReturnType<typeof mapDispatchToProps>;
type IStateProps = ReturnType<typeof mapStateToProps>;

type Props = IStateProps & IDispatchProps & IOwnProps;

function getBody(jobId: JobId | undefined, torrent: Torrent | undefined) {
  if (!jobId) {
    return 'add_magnet';
  }
  if (!torrent) {
    return 'uploading';
  }
  switch (torrent.status) {
    case 'magnet_conversion':
    case 'magnet_error':
    case 'waiting_files_selection':
      return torrent.status;
    default:
      return 'complete';
  }

}
export const AddTorrent = connect(mapStateToProps, mapDispatchToProps)(({ addMagnet, cancelJob, completeJob, deleteTorrent, selectFiles, jobs, torrents }: Props) => {
  const [jobId, setJobId] = useState(initialJobId);
  const torrentId = useMemo(()=>jobs[jobId], [jobs, jobId])
  // const [torrentId, setTorrentId] = useState(intitialTorrentId);
  // useEffect(() => {
  //   if (jobId && !torrentId) {
  //     setTorrentId(jobs[jobId])
  //   }
  // }, [jobs, jobId])
  const torrent = useMemo(() => torrents[torrentId], [torrents, torrentId]);

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
    if (jobId) {
      cancelJob(jobId);
    }
    window.close();
  }

  const displayMode = useMemo(() => getBody(jobId, torrent), [jobId, torrent]);
  return (
    <Dialog title="fn Debrid" onClose={window.close}>
      {(() => {
        switch (displayMode) {
          case 'add_magnet': return <AddMagnet onSubmit={submitMagnet} onCancel={cancelDownload} />;
          case 'uploading': return <h3>Uploading your magnet to real-debrid.com...</h3>;
          case 'magnet_conversion': return <h3>Converting your magnet...</h3>;
          case 'magnet_error': return <h3>Looks like this magnet isn't working right now. Try again later.</h3>;
          case 'waiting_files_selection': return <FileSelect torrent={torrent} onSubmit={submitFileSelection} onCancel={cancelDownload} />;
          case 'complete': return <h3>Submitted</h3>;
          default: return assertNever(displayMode);

        }
      })()}
    </Dialog>
  );
});