import { number } from 'prop-types';
import { Opaque, MergeExclusive } from 'type-fest';
import { Merge } from '../../common';

export type TorrentId = Opaque<string>;
export type MagnetLink = Opaque<string>;
export type FileId = Opaque<string>;
export type Link = Opaque<string>;
export type ClientId = Opaque<string>;
export type ClientSecret = Opaque<string>;
export type AccessToken = Opaque<string>;
export type RefreshToken = Opaque<string>;
export type DeviceCode = Opaque<string>;

export interface CodeInfo {
  device_code: DeviceCode;
  user_code: string;
  interval: number; // * 1000
  expires: Date;
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
  expires: Date;
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


export type TorrentStatus = "magnet_error" | "magnet_conversion" | "waiting_files_selection" | "queued" | "downloading" | "downloaded" | "error" | "virus" | "compressing" | "uploading" | "dead";


export interface ExtendedTorrent extends Torrent {
  original_filename: string;
  original_bytes: number;
  files: File[];
}




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
