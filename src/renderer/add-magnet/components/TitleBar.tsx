import { Navbar, Button, Alignment, Classes } from '@blueprintjs/core'
import React from 'react'
import styled from '@emotion/styled';

const DraggableNavBar = styled(Navbar)`
  -webkit-user-select: none;
  -webkit-app-region: drag;
`;
const NoDragButton = styled(Button)`
  -webkit-app-region: no-drag;
`;
export const TitleBar: React.FC<{ onClose?: () => void }> = ({onClose}) => {

  return (
    <DraggableNavBar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>fn Debrid</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <NoDragButton  icon="cross" minimal onClick={onClose} />
      </Navbar.Group>
    </DraggableNavBar>
  )
}