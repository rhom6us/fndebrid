import { State, Action } from "../../main/store";
import * as actions from "../../main/store/actions";
import React, { useState } from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

interface IOwnProps { }
interface IStateProps {
  downloadLocation: string;
  torrents: any[];
}
interface IDispatchProps {
  loadTorrents(): void;
  setDownloadLocation(location: string): void;
}

export type Props = IOwnProps & IStateProps & IDispatchProps;


const myfc:React.FC<Props> = (props) => {
  const [pendingValue, setPendingValue] = useState(props.downloadLocation);
  

  const submitChange = () => {
    props.setDownloadLocation(pendingValue);
  };
  return <div>
    <h2>download location is {props.downloadLocation}</h2>
    <hr/>
    <input type="text" value={pendingValue} onChange={(event) => setPendingValue(event.target.value)} />
    <button disabled={pendingValue == props.downloadLocation} onClick={submitChange}> submit </button>
    <hr/>
    <button onClick={()=>props.loadTorrents()}>load</button>
    <h1>{props.torrents.length}</h1>
    {/* <hr/>
    <pre>
      {JSON.stringify(props)}
    </pre> */}
  </div>;
};

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function(state, ownProps) {
  console.log(state);
  return {
    downloadLocation: state.preferences.downloadLocation,
    torrents: state.torrents.torrents
  };
}
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {
  return {
    loadTorrents() {
      dispatch(actions.fetchTorrents.request());
    },
    setDownloadLocation(downloadLocation: string) {
      dispatch(actions.setPreferences({ downloadLocation }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(myfc);