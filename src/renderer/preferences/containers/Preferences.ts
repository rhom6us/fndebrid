import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import State from '../../../main/store/torrents/state';
import Preferences from '../components/Preferences';

export default Preferences;

// interface IOwnProps { }
// interface IStateProps {
// }
// interface IDispatchProps {
// }

// export type Props = IOwnProps & IStateProps & IDispatchProps;


// const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function (state, ownProps) {
//   return {
//   };
// }
// const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {
//   return {
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Preferences);