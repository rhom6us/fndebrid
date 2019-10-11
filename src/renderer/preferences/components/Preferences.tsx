import { remote } from 'electron';
import React, { useEffect } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { State } from '../../../main/store';
import { PreferencesState } from '../../../main/store/preferences';
import { RadioGroup, Radio, Switch, TagInput, Button, Classes, FormGroup, ControlGroup, InputGroup } from '@blueprintjs/core';
import { handleStringChange, handleBooleanChange } from '../../helpers';
import { ActionCreator, TypeConstant } from 'typesafe-actions';
import { getDispatcher } from '../../../main/dispatcher';
import styled from '@emotion/styled';
const app = remote.app;
interface IOwnProps { }
type IStateProps = PreferencesState;
interface IDispatchProps {
  chooseDownloadLocation(): void;
  setDefaultDownloadLocation(): void;
  associateMagnetLinks(associate: boolean): void;
  associateTorrentFiles(associate: boolean): void;
  setAutoDeleteServer(autoDeleteServer: boolean): void;
  setAutoDownloadTorrents(autoDownloadTorrents: boolean): void;
  setAutoSubmitAutoSelectedFiles(autoSubmitAutoSelectedFiles: boolean): void;
  setWhiteList(files: string[]): void;
  setBlackList(files: string[]): void;
  setAutoDeleteTorrentFile(autoDeleteTorrentFile: 'never' | 'torrent_added' | 'torrent_completed' | 'download_completed'): void;
  setAutoSelectFiles(autoSelectFiles: 'none' | 'all_files' | 'largest_files' | 'pattern', pattern?: string): void;

}

export type Props = IOwnProps & IStateProps & IDispatchProps;
export const Preferences: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.downloadLocation) {
      console.log({ dispatching: location });
      props.setDefaultDownloadLocation();
    }
  });
  const SubOptions = styled('div')`
    padding-left: 20px;
  `
  return (
    <section>
      <FormGroup label="Download Location">
        <ControlGroup fill={true} vertical={false}>
          <InputGroup readOnly value={props.downloadLocation} />
          <Button icon="filter" onClick={props.chooseDownloadLocation}>Choose</Button>
        </ControlGroup>
      </FormGroup>
      <Switch checked={props.magnetLinksAssociated} label="Associate Magnet Links" onChange={handleBooleanChange(props.associateMagnetLinks)} />
      <Switch checked={props.torrentFilesAssociated} label="Associate Torrent Files" onChange={handleBooleanChange(value => props.associateTorrentFiles(value))} />

      <FormGroup >
        <Switch label="Automatically delete torrent files..." checked={props.autoDeleteTorrentFile != 'never'} onChange={handleBooleanChange(value => props.setAutoDeleteTorrentFile(value ? 'torrent_added' : 'never'))} />
        {(props.autoDeleteTorrentFile != 'never') &&
        <SubOptions>
          <RadioGroup
            onChange={handleStringChange(value => props.setAutoDeleteTorrentFile(value as any))}
            selectedValue={props.autoDeleteTorrentFile} >
            <Radio label="...after the torrent has been added to real-debrid" value="torrent_added" />
            <Radio label="...after the torrent download is complete on real-debrid" value="torrent_completed" />
            <Radio label="...after the torrent has downloaded to this computer" value="download_completed" />
          </RadioGroup>
          </SubOptions>
        }
      </FormGroup>

      <Switch checked={props.autoDownloadTorrents} label="Automatically download torrents as soon as they are complete" onChange={handleBooleanChange(props.setAutoDownloadTorrents)} />
      <Switch checked={props.autoDeleteServer} label="Delete torrent from real-debrid.com after download is complete" onChange={handleBooleanChange(value => props.setAutoDeleteServer(value))} />

      <FormGroup label="Always include files matching any of these patterns:" helperText="helper text" labelInfo="labelInfo">
        <TagInput className={Classes.FILL}
          addOnBlur={true}
          addOnPaste={true}
          rightElement={<Button
            icon="cross"
            minimal={true}
          />}
          values={[...props.fileWhiteList]}
          onChange={((values: string[]) => props.setWhiteList(values)) as any}
        />
      </FormGroup>

      <FormGroup label="Always exclude files matching any of these patterns:" helperText="helper text" labelInfo="labelInfo">
        <TagInput className={Classes.FILL}
          addOnBlur={true}
          addOnPaste={true}
          rightElement={<Button
            icon="cross"
            minimal={true}
          />}
          values={[...props.fileBlackList]}
          onChange={props.setBlackList as any}
        />
      </FormGroup>
    </section>
  )
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function (state, ownProps) {
  return state.preferences;
}
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {
  const dispatcher = getDispatcher(dispatch);
  return {
    ...dispatcher,
    setDefaultDownloadLocation: () => dispatcher.setPreferences({ downloadLocation: app.getPath('downloads') }),
    setWhiteList: fileWhiteList => dispatcher.setPreferences({ fileWhiteList }),
    setBlackList: fileBlackList => dispatcher.setPreferences({ fileBlackList }),
    setAutoDeleteServer: (autoDeleteServer) => dispatcher.setPreferences({ autoDeleteServer }),
    setAutoDeleteTorrentFile: (autoDeleteTorrentFile) => dispatcher.setPreferences({ autoDeleteTorrentFile }),
    setAutoDownloadTorrents: (autoDownloadTorrents) => dispatcher.setPreferences({ autoDownloadTorrents }),
    setAutoSelectFiles(autoSelectFiles, pattern) {
      if (autoSelectFiles == 'pattern')
        return dispatcher.setAutoSelectFilesPattern(pattern!);

      return dispatcher.setAutoSelectFiles(autoSelectFiles);
    },
    setAutoSubmitAutoSelectedFiles: autoSubmitAutoSelectedFiles => dispatcher.setPreferences({ autoSubmitAutoSelectedFiles }),


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);