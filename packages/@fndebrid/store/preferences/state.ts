// import {app} from 'electron';

export type AutoDeleteTorrentFileOption = 'never' | 'torrent_added' | 'torrent_completed' | 'download_completed';
export type FileGlob = string;

interface AutoSelectFilesOption<Type>  {
  readonly type: Type;
}
interface PositiveAutoSelectFilesOption<Type> extends AutoSelectFilesOption<Type>{
  readonly autoSubmitAutoSelectedFiles: boolean;
}
interface AutoSelectFilesUsingPattern<Type> extends PositiveAutoSelectFilesOption<Type>{
  readonly pattern: readonly FileGlob[];
}

export interface State {
  readonly torrentFilesAssociated: boolean;
  readonly magnetLinksAssociated: boolean;
  readonly autoDeleteServer: boolean;
  readonly autoDeleteTorrentFile: AutoDeleteTorrentFileOption;
  readonly fileWhiteList: readonly FileGlob[];
  readonly fileBlackList: readonly FileGlob[];
  readonly autoDownloadTorrents: boolean;
  readonly downloadLocation: string;
  readonly autoSelectFiles:
  | AutoSelectFilesOption<'none'>
  | PositiveAutoSelectFilesOption<'all'>
  | PositiveAutoSelectFilesOption<'largest'>
  | AutoSelectFilesUsingPattern<'pattern+'>
  | AutoSelectFilesUsingPattern<'pattern-'>;
}

export const defaultState: State = {
  downloadLocation: '', // app.getPath('downloads'),
  torrentFilesAssociated: false,
  magnetLinksAssociated: false,
  autoDownloadTorrents: true,
  autoDeleteServer: true,
  autoDeleteTorrentFile: 'torrent_added',
  autoSelectFiles: {
    type: 'all',
    autoSubmitAutoSelectedFiles: false,
  },
  fileWhiteList: [],
  fileBlackList: [],
};

export default State;
