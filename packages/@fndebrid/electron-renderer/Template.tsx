import React from 'react';
import {connect} from 'react-redux';
import {State, Dispatch, getDispatcher} from '@fndebrid/store';

interface IOwnProps {}
const mapStateToProps = function(state: State, ownProps: IOwnProps) {
  return {};
};
const mapDispatchToProps = function(dispatch: Dispatch, ownProps: IOwnProps) {
  const dispatcher = getDispatcher(dispatch);
  return {};
};
type IDispatchProps = ReturnType<typeof mapDispatchToProps>;
type IStateProps = ReturnType<typeof mapStateToProps>;

type Props = IStateProps & IDispatchProps & IOwnProps;
export const AddTorrent = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: Props) => {
  return <div />;
});
