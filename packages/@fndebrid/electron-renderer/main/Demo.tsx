import {TorrentId} from '@fndebrid/real-debrid';
import {State} from '@fndebrid/store';
import * as actions from '@fndebrid/store/actions';
import React, {useState} from 'react';
import {connect, MapDispatchToPropsFunction, MapStateToProps, useStore} from 'react-redux';

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

const myfc: React.FC<Props> = props => {
  const [pendingValue, setPendingValue] = useState(props.downloadLocation);
  console.log('ye haw');
  const store = useStore();
  console.log(store.getState());

  const submitChange = () => {
    props.setDownloadLocation(pendingValue);
  };
  return (
    <div>
      <h2>download location is {props.downloadLocation}</h2>
      <hr />
      <input type='text' value={pendingValue} onChange={event => setPendingValue(event.target.value)} />
      <button disabled={pendingValue == props.downloadLocation} onClick={submitChange}>
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

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function(state, ownProps) {
  console.log(state);
  return {
    downloadLocation: state.preferences.downloadLocation,
    torrents: state.realDebrid.torrents,
  };
};
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function(dispatch, ownProps) {
  return {
    loadTorrents() {
      dispatch(actions.fetchTorrents.request({activeOnly: false}));
    },
    setDownloadLocation(downloadLocation: string) {
      dispatch(actions.setPreferences({downloadLocation}));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(myfc);
