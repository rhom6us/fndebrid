import { remote } from 'electron';
import React, { useEffect, useState } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { State } from '../../../main/store';
import * as actions from "../../../main/store/actions";
const app = remote.app;
interface IOwnProps { }
interface IStateProps {
  downloadLocation: string;
}
interface IDispatchProps {
  setDownloadLocation(location: string): void;
}

export type Props = IOwnProps & IStateProps & IDispatchProps;
export const Preferences: React.FC<Props> = (props) => {
  console.log(props);
  const [dlLocation, setDlLocation] = useState(props.downloadLocation);
  // if(!props.downloadLocation){
  //   useEffect(()=>{
  //     const location = app.getPath('downloads');
  //     console.log({dispatching:location});
  //     props.setDownloadLocation(location);
  //   });
  // }
  return (
    <form>
      <label>
        DownloadLocation
        <input type="text" name="downloadLocation" value={props.downloadLocation} onChange={e => props.setDownloadLocation(e.target.value)}  />
      </label>
    </form>
  )
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function (state, ownProps) {
  return {
    downloadLocation: state.preferences.downloadLocation,
  };
}
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {
  return {
    setDownloadLocation(downloadLocation: string) {
      dispatch(actions.setPreferences({ downloadLocation }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);