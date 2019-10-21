import React from 'react';
import { H1 } from '@blueprintjs/core';
import { Torrent, FileId } from '~main/real-debrid';

interface IOwnProps {
  torrent: Torrent,
  onSubmit: (files: FileId[]) => void,
  onCancel: ()=>void,
}
export const FileSelect: React.FC<IOwnProps> = ({ torrent }) => (
  <H1>File Select</H1>
);