import {Button, H5, InputGroup} from '@blueprintjs/core';
import {isDev} from '@fndebrid/core';
import {MagnetLink} from '@fndebrid/real-debrid';
import React, {useEffect, useState} from 'react';
import uuid5 from 'uuid/v5';
import {Dialog} from '../../../components';
import {handleStringChange} from '../../../helpers';
import {isMagnetLink, tryReadClipboard} from './util';

const callbackId = uuid5(`http://fndebrid.butler.software/AddMagnet`, uuid5.URL);

interface IOwnProps {
  onSubmit: (magnetLink: MagnetLink) => void;
  onCancel: () => void;
}

export const AddMagnet: React.FC<IOwnProps> = ({onSubmit, onCancel: cancel}) => {
  const [magnet, setMagnet] = useState<string>(tryReadClipboard());
  const [validMagnet, setValidMagnet] = useState(isMagnetLink(magnet));

  function updateMagnet(m: string) {
    setValidMagnet(isMagnetLink(m));
    setMagnet(m);
  }
  function submit() {
    onSubmit(magnet as MagnetLink);
  }

  useEffect(() => {
    if (isDev) {
      if (!validMagnet) {
        updateMagnet(
          'magnet:?xt=urn:btih:18A58DFF7A4E73D40DB95AEED461B4C3CC95D28B&dn=Adobe+Illustrator+2020+v24.0.0.328+%28x64%29+Activated+%7E+%5BFileRiver%5D&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.si%3A1337%2Fannou%E2%80%8Bnce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.nwps.ws%3A6969%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fdenis.stalker.upeer.me%3A696%E2%80%8B9%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounc%E2%80%8Be&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce',
        );
      }
    }
  });

  return (
    <>
      <Dialog.Body>
        <H5>Add magnet link</H5>
        <InputGroup placeholder='Paste magnet link heere' value={magnet} onChange={handleStringChange(updateMagnet)} />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Footer.Actions>
          <Button rightIcon='upload' intent='primary' disabled={!validMagnet} onClick={submit}>
            Upload
          </Button>
          <Button rightIcon='small-cross' text='Cancel' onClick={cancel} />
        </Dialog.Footer.Actions>
      </Dialog.Footer>
    </>
    // <TitleBar onClose={cancel} />
    // <Card interactive={false}>
    //   <H5>Add magnet link</H5>
    //   <InputGroup placeholder="Paste magnet link heere" value={magnet} onChange={handleStringChange(setMagnet)} />
    //   <Flex justifyContent='flex-end' style={{ marginTop: '15px' }}>
    //     <ButtonGroup minimal={false}>
    //       <Button rightIcon="upload" intent="primary" onClick={submit}>Upload</Button>
    //       <Button rightIcon="small-cross" text="Cancel" onClick={cancel} />
    //     </ButtonGroup>
    //   </Flex>
    // </Card>
  );
};
