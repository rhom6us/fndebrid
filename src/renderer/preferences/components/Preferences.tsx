import { remote } from 'electron';
import React, { useEffect } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import dispatcher from "../../../main/dispatcher";
import { State } from '../../../main/store';
import { PreferencesState } from '../../../main/store/preferences';
import { RadioGroup, Radio, Switch, TagInput, Button } from '@blueprintjs/core';
import { handleStringChange, handleBooleanChange } from '../../helpers';
const app = remote.app;
interface IOwnProps { }
type IStateProps = PreferencesState;
interface IDispatchProps {
  setDownloadLocation(): void;
  setDefaultDownloadLocation(): void;
  associateMagnetLinks(associate: boolean): void;
  associateTorrentFiles(associate: boolean): void;
  setAutoDeleteServer(autoDeleteServer: boolean): void;
  setAutoDownloadTorrents(autoDownloadTorrents: boolean): void;
  setAutoSubmitAutoSelectedFiles(autoSubmitAutoSelectedFiles: boolean): void;
  addWhiteListFile(file: string): void;
  removeWhiteListFile(file: string): void;
  addBlackListFile(file: string): void;
  removeBlackListFile(file: string): void;
  setAutoDeleteTorrentFile(autoDeleteTorrentFile: 'never' | 'torrent_added' | 'torrent_completed' | 'download_completed'): void;
  setAutoSelectFiles(autoSelectFiles: 'none' | 'all_files' | 'largest_files' | 'pattern', pattern?: string): void;

}

// type Parameters<T> = T extends (... args: infer T) => any ? T : never; 
type Promisified<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;


export type Mapped<U extends { [key: string]: (...args: any[]) => any }> = {
  [N in keyof U]: Promisified<U[N]>
}
let acts = {
  a: (b: string) => ({ type: 'asdf' })
}
let bar!: Mapped<typeof acts>;

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
        <input type="checkbox" checked={props.magnetLinksAssociated} onChange={(e) => props.associateMagnetLinks(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          Associate Torrent Files
        <input type="checkbox" checked={props.torrentFilesAssociated} onChange={(e) => props.associateTorrentFiles(e.target.checked)} />
        </label>
      </div>
      <RadioGroup
        label="Delete torrent file"
        onChange={handleStringChange(value => props.setAutoDeleteTorrentFile(value as any))}
        selectedValue={props.autoDeleteTorrentFile} >
        <Radio label="never" value="never" />
        <Radio label="after the torrent has been added to real-debrid" value="torrent_added" />
        <Radio label="after the torrent download is complete on real-debrid" value="torrent_completed" />
        <Radio label="after the torrent has downloaded to this computer" value="download_completed" />
      </RadioGroup>
      <Switch checked={props.autoDownloadTorrents} label="Automatically download torrents as soon as they are complete" onChange={handleBooleanChange(value => props.setAutoDownloadTorrents(value))} />
      <Switch checked={props.autoDeleteServer} label="Delete torrent from real-debrid.com after download is complete" onChange={handleBooleanChange(value => props.setAutoDeleteServer(value))} />
      <TagInput
      addOnBlur={true}
      addOnPaste={true}
       rightElement={<Button
                icon="cross"
                minimal={true}
            />}
            values={props.fileWhiteList as any[]}
            onChange={((values:string[]) => props.addWhiteListFile(values[values.length-1])) as any}
            ></TagInput>
    </section>
  )
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function (state, ownProps) {
  return state.preferences;
  // return {
  //   downloadLocation: state.preferences.downloadLocation,
  //   magnetLinksAccociated: state.preferences.magnetLinksAssociated,
  //   torrentFilesAssociated: state.preferences.torrentFilesAssociated
  // };
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
    },
    addBlackListFile(file) {
      dispatch(dispatcher.blackListFile(file));
    },
    addWhiteListFile(file) {
      dispatch(dispatcher.whiteListFile(file));
    },
    removeBlackListFile(file) {
      dispatch(dispatcher.unBlackListFile(file));
    },
    removeWhiteListFile(file) {
      dispatch(dispatcher.unWhiteListFile(file));
    },
    setAutoDeleteServer(autoDeleteServer) {
      dispatch(dispatcher.setPreferences({ autoDeleteServer }));
    },
    setAutoDeleteTorrentFile(autoDeleteTorrentFile) {
      dispatch(dispatcher.setPreferences({ autoDeleteTorrentFile }));
    },
    setAutoDownloadTorrents(autoDownloadTorrents) {
      dispatch(dispatcher.setPreferences({ autoDownloadTorrents }));
    },
    setAutoSelectFiles(autoSelectFiles, pattern) {
      if (autoSelectFiles == 'pattern')
        return dispatch(dispatcher.setAutoSelectFilesPattern(pattern!));

      return dispatch(dispatcher.setAutoSelectFiles(autoSelectFiles));
    },

    setAutoSubmitAutoSelectedFiles(autoSubmitAutoSelectedFiles) {
      dispatch(dispatcher.setPreferences({ autoSubmitAutoSelectedFiles }));
    },


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);