


export default interface RootState {
    downloadLocation: string,
    associateTorrentFiles: boolean,
    associateMagnetLinks: boolean,
    autoDownloadTorrents: boolean,
    autoDeleteServer: boolean,
    autoDeleteTorrentFile: AutoDeleteCondition,
    autoSelectFiles: AutoSelectFileCondition | string[],
    fileWhiteList: string[],
    fileBlackList: string[],
 }

 export enum AutoDeleteCondition {
     Never,
     TorrentAdded,
     TorrentCompleted,
     DownloadCompleted,
 }
export enum AutoSelectFileCondition {
    AllFiles,
    LargestFile,
}

