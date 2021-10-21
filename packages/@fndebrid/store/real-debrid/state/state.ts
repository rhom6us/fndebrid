import type { File, MaybeExtendedTorrent, TorrentHash, TorrentId } from '@fndebrid/real-debrid';
import { Job } from './Job';
import type { JobId } from './JobId';

export interface State {
  readonly loading: boolean;
  readonly torrents: readonly TorrentId[];
  readonly entities: {
    readonly torrents: Record<string, Readonly<MaybeExtendedTorrent>>;
    readonly files: Record<string, readonly File[]>;
  };
  readonly selectedTorrent?: TorrentId;
  readonly errors?: Error | string;
  readonly jobs: Record<JobId, Job>;
  readonly hashes: Record<TorrentHash, readonly TorrentId[]>;
}
export namespace State {
  export const defaultValue: State = {
    torrents: [],
    errors: undefined,
    entities: {
      torrents: {},
      files: {},
    },
    loading: false,
    jobs: {},
    hashes: {},
  };
}
