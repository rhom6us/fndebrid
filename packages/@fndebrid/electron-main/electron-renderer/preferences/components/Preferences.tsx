import { Button, Callout, Classes, ControlGroup, FormGroup, H1, InputGroup, Radio, RadioGroup, Switch, TagInput } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { remote } from 'electron';
import React, { useEffect } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { handleBooleanChange, handleStringChange } from '../../helpers';
import { AutoDeleteTorrentFileOption } from '@fndebrid/store/preferences';
import { getDispatcher, State, Action, Dispatch } from '@fndebrid/store';
const app = remote.app;
interface IOwnProps { }

const mapStateToProps = function (state: State, ownProps: IOwnProps) {
  return state.preferences;
}
const mapDispatchToProps = function (dispatch: Dispatch, ownProps: IOwnProps) {
  const dispatcher = getDispatcher(dispatch);
  return {
    ...dispatcher,
    setDefaultDownloadLocation: () => dispatcher.setPreferences({ downloadLocation: app.getPath('downloads') }),
    setWhiteList: (fileWhiteList: string[]) => dispatcher.setPreferences({ fileWhiteList }),
    setBlackList: (fileBlackList: string[]) => dispatcher.setPreferences({ fileBlackList }),
    setAutoDeleteServer: (autoDeleteServer: boolean) => dispatcher.setPreferences({ autoDeleteServer }),
    setAutoDeleteTorrentFile: (autoDeleteTorrentFile: AutoDeleteTorrentFileOption) => dispatcher.setPreferences({ autoDeleteTorrentFile }),
    setAutoDownloadTorrents: (autoDownloadTorrents: boolean) => dispatcher.setPreferences({ autoDownloadTorrents }),
    setAutoSelectFiles(autoSelectFiles: 'none' | 'all_files' | 'largest_files' | 'pattern', pattern?: string) {
      if (autoSelectFiles == 'pattern')
        return dispatcher.setAutoSelectFilesPattern(pattern!);

      return dispatcher.setAutoSelectFiles(autoSelectFiles);
    },
    setAutoSubmitAutoSelectedFiles: (autoSubmitAutoSelectedFiles: boolean) => dispatcher.setPreferences({ autoSubmitAutoSelectedFiles }),


  }
}

const SubRadioGroup = styled(RadioGroup)`
padding-left: 20px;
`
const RootElement = styled('section')({
  maxWidth: '600px',
  margin: 'auto',
  padding: '25px 50px'
})
const ListContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between', //'center',
  alignItems: 'stretch',
  padding: '25px 0'
});
const ListItem = styled(FormGroup)({
  width: '180px',
  flexGrow: 1,
  flexBasis: '40%',
  margin: '0 20px'
});
const Preferences: React.FC<IOwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = (props) => {
  useEffect(() => {props.downloadLocation || props.setDefaultDownloadLocation()});
  return (
    <RootElement>
      <H1>Settings</H1>
      <Callout title="Downloads">
        <FormGroup label="Download Location">
          <ControlGroup fill={true} vertical={false}>
            <InputGroup readOnly value={props.downloadLocation} fill={true} />
            <Button icon="filter" onClick={props.chooseDownloadLocation}>Choose</Button>
          </ControlGroup>
        </FormGroup>
        <Switch checked={props.autoDownloadTorrents} label="Automatically download torrents as soon as they are complete" onChange={handleBooleanChange(props.setAutoDownloadTorrents)} />
        <Switch checked={props.autoDeleteServer} label="Delete torrent from real-debrid.com after download is complete" onChange={handleBooleanChange( props.setAutoDeleteServer)} />

      </Callout>
      <br />
      <Callout title="Files">
        <Switch checked={props.magnetLinksAssociated} label="Associate Magnet Links" onChange={handleBooleanChange(props.associateMagnetLinks)} />
        <Switch checked={props.torrentFilesAssociated} label="Associate Torrent Files" onChange={handleBooleanChange(props.associateTorrentFiles)} />
        <Switch label="Automatically delete torrent files..." checked={props.autoDeleteTorrentFile != 'never'} onChange={handleBooleanChange(value => props.setAutoDeleteTorrentFile(value ? 'torrent_added' : 'never'))} />
        {(props.autoDeleteTorrentFile != 'never') &&
          <SubRadioGroup
            onChange={handleStringChange(props.setAutoDeleteTorrentFile as any)}
            selectedValue={props.autoDeleteTorrentFile} >
            <Radio label="...after the torrent has been added to real-debrid" value="torrent_added" />
            <Radio label="...after the torrent download is complete on real-debrid" value="torrent_completed" />
            <Radio label="...after the torrent has downloaded to this computer" value="download_completed" />
          </SubRadioGroup>
        }
      </Callout>
      <br />

      <Callout title="Uploads">
        FnDebrid can automatically select files base on the follow whitelist and blacklist.
        <ListContainer>
          <ListItem label="Always include files matching any of these patterns:" helperText="helper text" labelInfo="labelInfo">
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
          </ListItem>

          <ListItem label="Always exclude files matching any of these patterns:" helperText="helper text" labelInfo="labelInfo">
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
          </ListItem>
        </ListContainer>
      </Callout>
    </RootElement>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Preferences);