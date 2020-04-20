import { Button, Callout, Classes, ControlGroup, FormGroup, H1, InputGroup, Radio, RadioGroup, Switch, TagInput } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { AutoDeleteTorrentFileOption } from '@fndebrid/store/preferences';
import { remote } from 'electron';
import React, { useEffect } from 'react';
import { handleBooleanChange, handleStringChange } from '../../helpers';
import { useCommand, useEventSource } from '../../hooks';

const app = remote.app;
// tslint:disable-next-line: no-empty-interface
// function mapDispatchToProps(dispatch: FnDispatch, ownProps: IOwnProps) {
//   const dispatcher = getDispatcher(dispatch);
//   return {
//     ...dispatcher.preferences,
//     setDefaultDownloadLocation: () => dispatcher.preferences.setPreferences({ downloadLocation: app.getPath('downloads') }),
//     setWhiteList: (fileWhiteList: string[]) => dispatcher.preferences.setPreferences({ fileWhiteList }),
//     setBlackList: (fileBlackList: string[]) => dispatcher.preferences.setPreferences({ fileBlackList }),
//     setAutoDeleteServer: (autoDeleteServer: boolean) => dispatcher.preferences.setPreferences({ autoDeleteServer }),
//     setAutoDeleteTorrentFile: (autoDeleteTorrentFile: AutoDeleteTorrentFileOption) =>
//       dispatcher.preferences.setPreferences({ autoDeleteTorrentFile }),
//     setAutoDownloadTorrents: (autoDownloadTorrents: boolean) => dispatcher.preferences.setPreferences({ autoDownloadTorrents }),
//     setAutoSelectFiles(autoSelectFiles: 'none' | 'all_files' | 'largest_files' | 'pattern', pattern?: string) {
//       if (autoSelectFiles === 'pattern') return dispatcher.preferences.setAutoSelectFilesPattern(pattern!);

//       return dispatcher.preferences.setAutoSelectFiles(autoSelectFiles);
//     },
//     setAutoSubmitAutoSelectedFiles: (autoSubmitAutoSelectedFiles: boolean) =>
//       dispatcher.preferences.setPreferences({ autoSubmitAutoSelectedFiles }),
//   };
// }

const SubRadioGroup = styled(RadioGroup)`
  padding-left: 20px;
`;
const RootElement = styled('section')({
  maxWidth: '600px',
  margin: 'auto',
  padding: '25px 50px',
});
const ListContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between', // 'center',
  alignItems: 'stretch',
  padding: '25px 0',
});
const ListItem = styled(FormGroup)({
  width: '180px',
  flexGrow: 1,
  flexBasis: '40%',
  margin: '0 20px',
});

export const Preferences: React.FC = () => {
  const { downloadLocation, magnetLinksAssociated, torrentFilesAssociated, autoDownloadTorrents, autoDeleteTorrentFile, autoDeleteServer, fileWhiteList, fileBlackList } = useEventSource(state => state.preferences);
  const { chooseDownloadLocation, setAutoDownloadTorrents, setAutoDeleteServer, associateMagnetLinks, associateTorrentFiles, setAutoDeleteTorrentFile, setWhiteList, setBlackList } = useCommand(({ preferences: { chooseDownloadLocation, updatePreferences, associateTorrentFiles, associateMagnetLinks } }) => ({
    chooseDownloadLocation: (downloadLocation: string = app.getPath('downloads')) => updatePreferences({ downloadLocation }),
    setAutoDownloadTorrents: (autoDownloadTorrents: boolean) => updatePreferences({ autoDownloadTorrents }),
    setAutoDeleteServer: (autoDeleteServer: boolean) => updatePreferences({ autoDeleteServer }),
    associateTorrentFiles: (associated: boolean) => associateTorrentFiles({ associated }),
    associateMagnetLinks: (associated: boolean) => associateMagnetLinks({ associated }),
    setAutoDeleteTorrentFile: (autoDeleteTorrentFile: AutoDeleteTorrentFileOption) => updatePreferences({ autoDeleteTorrentFile }),
    setWhiteList: (fileWhiteList: readonly string[]) => updatePreferences({ fileWhiteList }),
    setBlackList: (fileBlackList: readonly string[]) => updatePreferences({ fileBlackList }),
    // setAutoSubmitAutoSelectedFiles:  (autoSubmitAutoSelectedFiles: boolean) =>   updatePreferences({ autoSubmitAutoSelectedFiles }),
    // setAutoSelectFiles(autoSelectFiles: 'none' | 'all_files' | 'largest_files' | 'pattern', pattern?: string) {
    //   if (autoSelectFiles === 'pattern') return preferences.setAutoSelectFilesPattern(pattern!);

    //   return dispatcher.preferences.setAutoSelectFiles(autoSelectFiles);
    // },
  }));

  useEffect(() => {
    if (!downloadLocation) {
      chooseDownloadLocation();

    }
  });
  return (
    <RootElement>
      <H1>Settings</H1>
      <Callout title='Downloads'>
        <FormGroup label='Download Location'>
          <ControlGroup fill={true} vertical={false}>
            <InputGroup readOnly value={downloadLocation} fill={true} />
            <Button icon='filter' onClick={() => chooseDownloadLocation()}>
              Choose
            </Button>
          </ControlGroup>
        </FormGroup>
        <Switch
          checked={autoDownloadTorrents}
          label='Automatically download torrents as soon as they are complete'
          onChange={handleBooleanChange(setAutoDownloadTorrents)}
        />
        <Switch
          checked={autoDeleteServer}
          label='Delete torrent from real-debrid.com after download is complete'
          onChange={handleBooleanChange(setAutoDeleteServer)}
        />
      </Callout>
      <br />
      <Callout title='Files'>
        <Switch
          checked={magnetLinksAssociated}
          label='Associate Magnet Links'
          onChange={handleBooleanChange(associateMagnetLinks)}
        />
        <Switch
          checked={torrentFilesAssociated}
          label='Associate Torrent Files'
          onChange={handleBooleanChange(associateTorrentFiles)}
        />
        <Switch
          label='Automatically delete torrent files...'
          checked={autoDeleteTorrentFile !== 'never'}
          onChange={handleBooleanChange(value => setAutoDeleteTorrentFile(value ? 'torrent_added' : 'never'))}
        />
        {autoDeleteTorrentFile !== 'never' && (
          <SubRadioGroup
            onChange={handleStringChange(setAutoDeleteTorrentFile as any)}
            selectedValue={autoDeleteTorrentFile}>
            <Radio label='...after the torrent has been added to real-debrid' value='torrent_added' />
            <Radio label='...after the torrent download is complete on real-debrid' value='torrent_completed' />
            <Radio label='...after the torrent has downloaded to this computer' value='download_completed' />
          </SubRadioGroup>
        )}}
      </Callout>
      <br />

      <Callout title='Uploads'>
        FnDebrid can automatically select files base on the follow whitelist and blacklist.
        <ListContainer>
          <ListItem label='Always include files matching any of these patterns:' helperText='helper text' labelInfo='labelInfo'>
            <TagInput
              className={Classes.FILL}
              addOnBlur={true}
              addOnPaste={true}
              rightElement={<Button icon='cross' minimal={true} />}
              values={[...fileWhiteList]}
              onChange={((values: string[]) => setWhiteList(values)) as any}
            />
          </ListItem>

          <ListItem label='Always exclude files matching any of these patterns:' helperText='helper text' labelInfo='labelInfo'>
            <TagInput
              className={Classes.FILL}
              addOnBlur={true}
              addOnPaste={true}
              rightElement={<Button icon='cross' minimal={true} />}
              values={[...fileBlackList]}
              onChange={setBlackList as any}
            />
          </ListItem>
        </ListContainer>
      </Callout>
    </RootElement>
  );
}
