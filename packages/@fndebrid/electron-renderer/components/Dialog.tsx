import { Classes, Dialog as BpDialog } from '@blueprintjs/core';
import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

const HeightBpDialog = styled(BpDialog)`
  height: 100vh;
  margin: 0;
`;
export function Dialog({
  children,
  title,
  onClose,
}: PropsWithChildren<{ title: string; onClose: Function }>) {
  return (
    <HeightBpDialog
      onClose={onClose as any}
      backdropProps={{ hidden: true }}
      autoFocus={true}
      usePortal={false}
      hasBackdrop={false}
      isOpen={true}
      isCloseButtonShown={true}
      title={title}
    >
      {children}
    </HeightBpDialog>
  );
}

export namespace Dialog {
  export const Body: React.FC = ({ children }) => {
    return <div className={Classes.DIALOG_BODY}>{children}</div>;
  };
  export function Footer({ children }: PropsWithChildren<{}>) {
    return <div className={Classes.DIALOG_FOOTER}>{children}</div>;
  }
  export namespace Footer {
    export function Actions({ children }: PropsWithChildren<{}>) {
      return <div className={Classes.DIALOG_FOOTER_ACTIONS}>{children}</div>;
    }
  }
}
