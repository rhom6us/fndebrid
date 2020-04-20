import { Torrent, TorrentStatus } from '@fndebrid/real-debrid';
import { FnState } from '@fndebrid/store';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useCommand, useEventSource } from '../../hooks';

// tslint:disable-next-line: no-empty-interface

function objToArray<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

type DeadStatus = 'magnet_error' | 'error' | 'virus' | 'dead';
function isDead(status: TorrentStatus): status is DeadStatus {
  switch (status) {
    case 'magnet_error':
    case 'error':
    case 'virus':
    case 'dead':
    case 'downloaded':
      return true;
    default:
      return false;
  }
}
// tslint:disable-next-line: no-empty-interface
// interface IOwnProps {}
// const mapStateToProps = (state: FnState, ownProps: IOwnProps) => {
//   const torrents = objToArray(state.realDebrid.entities.torrents);
//   return {
//     activeTorrents: torrents.filter(p => !isDead(p.status)),
//     doneTorrents: torrents.filter(p => p.status === 'downloaded'),
//     deadTorrents: torrents.filter(p => isDead(p.status)),
//   };
// };
// const mapDispatchToProps = (dispatch: FnDispatch, ownProps: IOwnProps) => {
//   const dispatcher = getDispatcher(dispatch);
//   return {
//     fetchAll: () => dispatcher.realDebrid.fetchAllTorrents.request(),
//   };
// };
// type DispatchProps = ReturnType<typeof mapDispatchToProps>;
// type StateProps = ReturnType<typeof mapStateToProps>;

// type Props = StateProps & DispatchProps & IOwnProps;
export default Torrents;
export const Torrents: FC = ({ }) => {
  const { fetchAll } = useCommand(cmds => ({
    fetchAll: cmds.realDebrid.fetchAllTorrents
  }));
  const { activeTorrents, doneTorrents, deadTorrents } = useEventSource(state => {
    const torrents = objToArray(state.realDebrid.entities.torrents);
    return {
      activeTorrents: torrents.filter(p => !isDead(p.status)),
      doneTorrents: torrents.filter(p => p.status === 'downloaded'),
      deadTorrents: torrents.filter(p => isDead(p.status)),
    };
  });

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <section>
      <h3>torrents!</h3>
      <dl>
        <dd>active</dd>
        {activeTorrents.map(torrent => (
          <dt>{torrent.original_filename}</dt>
        ))}
        <dd>ready</dd>
        {doneTorrents.map(torrent => (
          <dt>{torrent.original_filename}</dt>
        ))}
        <dd>dead</dd>
        {deadTorrents.map(torrent => (
          <dt>{torrent.original_filename}</dt>
        ))}
      </dl>
      <ul></ul>
    </section>
  );
};
