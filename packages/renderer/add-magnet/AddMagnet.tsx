import { H1, InputGroup, Card, H5, Button, ButtonGroup, AnchorButton, Classes, FormGroup, ControlGroup } from '@blueprintjs/core'
import React, { useState, useEffect, useLayoutEffect, isValidElement } from 'react';
import { TitleBar, Dialog } from './components';
import styled from '@emotion/styled';
import { handleStringChange } from '../helpers';
import uuid5 from 'uuid/v5';
import { ipcRenderer, clipboard } from 'electron';
import { Flex } from './components/Flex';
import { State } from '../../main/store';
import { Dispatch, Action } from 'redux';
import { getDispatcher } from '../../main/dispatcher';
import { MagnetLink, getInfoHash } from '../../main/real-debrid';
import { connect } from 'react-redux';
import { JobId } from '../../main/store/torrents/state';
const callbackId = uuid5(`http://fndebrid.butler.software/AddMagnet`, uuid5.URL);
function tryReadClipboard() {
  try {
    const clipText = clipboard.readText();
    if (isMagnetLink(clipText)) {
      return clipText;
    }
  } catch (error) {
  }
  return '';
}
function isMagnetLink(magnet: string) {
  try {
    const url = new URL(magnet);
    return url.protocol === 'magnet:'
  } catch (e) {

  }
  return false;
}
interface IOwnProps {
  onSubmit: (magnetLink: MagnetLink) => void;
  onCancel: () => void;
}


export const AddMagnet: React.FC<IOwnProps> = ({ onSubmit, onCancel: cancel }) => {
  const [magnet, setMagnet] = useState<string>(tryReadClipboard());
  const [validMagnet, setValidMagnet] = useState(isMagnetLink(magnet))
  function updateMagnet(m: string) {
    setValidMagnet(isMagnetLink(m));
    setMagnet(m);
  }
  function submit() {
    onSubmit(magnet as MagnetLink)
  }



  return (

    <>
      <Dialog.Body>
        <H5>Add magnet link</H5>
        <InputGroup placeholder="Paste magnet link heere" value={magnet} onChange={handleStringChange(updateMagnet)} />
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Footer.Actions>
          <Button rightIcon="upload" intent="primary" disabled={!validMagnet} onClick={submit}>Upload</Button>
          <Button rightIcon="small-cross" text="Cancel" onClick={cancel} />
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
