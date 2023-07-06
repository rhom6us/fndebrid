import { FnState } from '@fndebrid/store';
import React from 'react';
import { Commands, useCommand, useEventSource } from './hooks';

// tslint:disable-next-line: no-empty-interface
interface IOwnProps {}
const mapStateToProps = (state: FnState) => ({});
const mapDispatchToProps = (dispatch: Commands) => {
  return {};
};

export const Template = ({}: IOwnProps) => {
  const state = useEventSource(mapStateToProps);
  const cmds = useCommand(mapDispatchToProps);
  return <div />;
};
