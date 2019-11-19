import {FnDispatch, FnState, getDispatcher} from '@fndebrid/store';
import React from 'react';
import {connect} from 'react-redux';

// tslint:disable-next-line: no-empty-interface
interface IOwnProps {}
const mapStateToProps = (state: FnState, ownProps: IOwnProps) => ({});
const mapDispatchToProps = (dispatch: FnDispatch, ownProps: IOwnProps) => {
  const dispatcher = getDispatcher(dispatch);
  return {};
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & DispatchProps & IOwnProps;
export const AddTorrent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({}: Props) => {
  return <div />;
});
