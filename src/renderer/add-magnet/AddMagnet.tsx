import { H1, InputGroup, Card, H5, Button, ButtonGroup, AnchorButton, Classes, FormGroup, ControlGroup } from '@blueprintjs/core'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TitleBar } from './components';
import styled from '@emotion/styled';
import { handleStringChange } from '../helpers';
import uuid5 from 'uuid/v5';
import { ipcRenderer, clipboard } from 'electron';
import { Flex } from './components/Flex';
import { State } from '../../main/store';
import { Dispatch, Action } from 'redux';
import { getDispatcher } from '../../main/dispatcher';
import { MagnetLink } from '../../main/real-debrid';
import { connect } from 'react-redux';
const callbackId = uuid5(`http://fndebrid.butler.software/AddMagnet`, uuid5.URL);
function tryReadClipboard() {
  try {
    const clipText = clipboard.readText();
    const url = new URL(clipText);
    if (url.protocol == 'magnet:') {
      return clipText;
    }
  } catch (error) {
    console.log('clipTest', { error, stack: error.stack })
  }
  return '';
}
interface IOwnProps{}
const mapStateToProps = function (state: State, ownProps: IOwnProps) {
  return {};
}
const mapDispatchToProps = function (dispatch: Dispatch<Action<any>>, ownProps: IOwnProps) { 
  const dispatcher = getDispatcher(dispatch);
  return {
    addMagnet: (magnet: string) => dispatcher.addMagnet.request(magnet as MagnetLink),
  }
}
type IDispatchProps = ReturnType<typeof mapDispatchToProps>;
type IStateProps = ReturnType<typeof mapStateToProps>;

type Props = IStateProps & IDispatchProps & IOwnProps;
export const AddMagnet = connect(mapStateToProps, mapDispatchToProps)((props:Props) => {
  const [magnet, setMagnet] = useState<string>(tryReadClipboard());
  function submit() {
    props.addMagnet(magnet);
  }
  function cancel() {
    window.close();
  }
  console.log('AddMagnet');


  return (
    <>
      <TitleBar onClose={cancel} />
      <Card interactive={false}>
        <H5>Add magnet link</H5>
        <InputGroup placeholder="Paste magnet link heere" value={magnet} onChange={handleStringChange(setMagnet)} />
        <Flex justifyContent='flex-end' style={{ marginTop: '15px' }}>
          <ButtonGroup minimal={false}>
            <Button rightIcon="upload" intent="primary" onClick={submit}>Upload</Button>
            <Button rightIcon="small-cross" text="Cancel" onClick={cancel} />
          </ButtonGroup>
        </Flex>
      </Card>
    </>
  );
});
