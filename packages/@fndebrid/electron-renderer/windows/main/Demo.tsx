import { TorrentId } from '@fndebrid/real-debrid';
import { actions, FnState } from '@fndebrid/store';
import React, { useState } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps, useStore } from 'react-redux';

// tslint:disable-next-line: no-empty-interface
interface IOwnProps {}
interface IStateProps {
  readonly downloadLocation: string;
  readonly torrents: readonly TorrentId[];
}
interface IDispatchProps {
  loadTorrents(): void;
  setDownloadLocation(location: string): void;
}

export type Props = IOwnProps & IStateProps & IDispatchProps;

const DemoInternal: React.FC<Props> = props => {
  const [pendingValue, setPendingValue] = useState(props.downloadLocation);

  const submitChange = () => {
    props.setDownloadLocation(pendingValue);
  };
  return (
    <div>
      <h2>download location is {props.downloadLocation}</h2>
      <hr />
      <input type='text' value={pendingValue} onChange={event => setPendingValue(event.target.value)} />
      <button disabled={pendingValue === props.downloadLocation} onClick={submitChange}>
        {' '}
        submit{' '}
      </button>
      <hr />
      <button onClick={() => props.loadTorrents()}>load</button>
      <h1>{props.torrents.length}</h1>
      {/* <hr/>
    <pre>
      {JSON.stringify(props)}
    </pre> */}
    </div>
  );
};

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, FnState> = (state, ownProps) => {
  return {
    downloadLocation: state.preferences.downloadLocation,
    torrents: state.realDebrid.torrents,
  };
};
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = (dispatch, ownProps) => {
  return {
    loadTorrents() {
      dispatch(actions.realDebrid.fetchAllTorrents.request());
    },
    setDownloadLocation(downloadLocation: string) {
      dispatch(actions.preferences.setPreferences({ downloadLocation }));
    },
  };
};

export const Demo = connect(mapStateToProps, mapDispatchToProps)(DemoInternal);
