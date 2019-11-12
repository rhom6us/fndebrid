import {Dispatch, getDispatcher, State} from '@fndebrid/store';
import React, {FC} from 'react';
import {connect} from 'react-redux';

// tslint:disable-next-line: no-empty-interface
interface IOwnProps {}
const mapStateToProps = (state: State, ownProps: IOwnProps) => ({});
const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOwnProps) => {
  const dispatcher = getDispatcher(dispatch);
  return {};
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & DispatchProps & IOwnProps;
const TorrentsInternal: FC<Props> = ({}) => {
  return <h3>torrents!</h3>;
};
export const Torrents = connect(mapStateToProps, mapDispatchToProps)(TorrentsInternal);
