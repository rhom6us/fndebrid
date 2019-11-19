import { Opaque } from '@fndebrid/core';

export type TorrentId = Opaque<string, 'torrent_id'>;
export function TorrentId(id: string) {
  return id as TorrentId;
}
export type MagnetLink = Opaque<string, 'magnet_link'>;
export type TorrentHash = Opaque<string, 'torrent_hash'>;
export type FileId = Opaque<number, 'file_id'>;
export type Link = Opaque<string, 'link'>;
export type ClientId = Opaque<string, 'client_id'>;
export type ClientSecret = Opaque<string, 'client_secret'>;
export type AccessToken = Opaque<string, 'access_token'>;
export type RefreshToken = Opaque<string, 'refresh_token'>;
export type DeviceCode = Opaque<string, 'device_code'>;

export interface CodeInfo {
  device_code: DeviceCode;
  user_code: string;
  interval: number; // * 1000
  expires: number;
  direct_verification_url: string;
}
export interface Credentials {
  client_id: ClientId;
  client_secret: ClientSecret;
}
export interface TokenInfo {
  access_token: AccessToken;
  refresh_token: RefreshToken;
  token_type: 'Bearer';
  expires: number;
}

export interface Torrent {
  id: TorrentId;
  filename: string;
  hash: string;
  // bytes: number;
  host: string;
  split: number;
  status: TorrentStatus;
  added: Date;
  // files: File[];
  progress: number;
  links: string[];
  ended?: Date;
  speed?: number;
  seeders?: number;
}

export type TorrentStatus =
  | 'magnet_error'
  | 'magnet_conversion'
  | 'waiting_files_selection'
  | 'queued'
  | 'downloading'
  | 'downloaded'
  | 'error'
  | 'virus'
  | 'compressing'
  | 'uploading'
  | 'dead';

export interface TorrentExtension {
  original_filename: string;
  original_bytes: number;
  files: File[];
}
export type ExtendedTorrent = TorrentExtension & Torrent;
export type MaybeExtendedTorrent = Partial<TorrentExtension> & Torrent;

export interface File {
  id: FileId;
  path: string;
  bytes: number;
  selected: number;
}

export interface LinkInfo {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  link: string;
  host: string;
  host_icon: string;
  chunks: number;

  download: string;
  streamable: number;
}

export interface CachedFileInfo {
  filename: string;
  filesize: number;
}

export interface HashAvailability {
  [hash: string]: {
    [hoster: string]: Array<Record<FileId, CachedFileInfo>>;
  };
}
