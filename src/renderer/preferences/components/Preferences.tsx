import { remote } from 'electron';
import React, { useEffect, useState } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { State } from '../../../main/store';
import dispatcher from "../../../main/dispatcher";
const app = remote.app;
interface IOwnProps { }
interface IStateProps {
  downloadLocation: string;
  magnetLinksAccociated: boolean;
  torrentFilesAssociated: boolean;
}
interface IDispatchProps {
  setDownloadLocation(): void;
  setDefaultDownloadLocation(): void;
  associateMagnetLinks(associate: boolean): void;
  associateTorrentFiles(associate: boolean): void;
}

// type Parameters<T> = T extends (... args: infer T) => any ? T : never; 
type Promisified<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;


export type Mapped<U extends {[key:string]:(...args:any[])=>any}> = {
    [N in keyof U]: Promisified<U[N]>
}
let acts = {
  a:(b:string) => ({type:'asdf'})
}
let bar!:Mapped<typeof acts>;

export type Props = IOwnProps & IStateProps & IDispatchProps;
export const Preferences: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.downloadLocation) {
      console.log({ dispatching: location });
      props.setDefaultDownloadLocation();
    }
  });
  return (
    <section>
      <div>
        <label>
          DownloadLocation
        <input type="input" readOnly value={props.downloadLocation} />
          <button onClick={props.setDownloadLocation}>Choose</button>
        </label>
      </div>
      <div>
        <label>
          Associate Magnet Links
        <input type="checkbox" checked={props.magnetLinksAccociated} onChange={(e) => props.associateMagnetLinks(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          Associate Torrent Files
        <input type="checkbox" checked={props.torrentFilesAssociated} onChange={(e) => props.associateTorrentFiles(e.target.checked)} />
        </label>
      </div>
    </section>
  )
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function (state, ownProps) {
  return {
    downloadLocation: state.preferences.downloadLocation,
    magnetLinksAccociated: state.preferences.magnetLinksAssociated,
    torrentFilesAssociated: state.preferences.torrentFilesAssociated
  };
}
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {

  return {
    setDownloadLocation() {
      dispatch(dispatcher.chooseDownloadLocation());
    },
    setDefaultDownloadLocation() {
      dispatch(dispatcher.setPreferences({ downloadLocation: app.getPath('downloads') }))
    },
    associateMagnetLinks(associateMagnetLinks) {
      dispatch(dispatcher.associateMagnetLinks.request({ associateMagnetLinks }));
    },
    associateTorrentFiles(associate) {
      dispatch(dispatcher.associateTorrentFiles.request(associate));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);