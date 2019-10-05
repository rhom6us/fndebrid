import { State, RootAction } from "../../main/store";
import * as actions from "../../main/store/actions";
import React, { useState } from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

export interface IOwnProps { }
export interface IStateProps {
  downloadLocation: string;
}
export interface IDispatchProps {
  setDownloadLocation(location: string): void;
}

export type Props = IOwnProps & IStateProps & IDispatchProps;

export interface IComponentState<T> {
  pendingValue: T;
  currentValue: T;
}

// export class DemoComponent extends React.Component<Props, IComponentState<string>> {

//   constructor(props:Props){
//     super(props);
//     this.setState((state, props) => {
//       return {pendingValue: props.downloadLocation};
//     });
    

//   }
//   updatePendingValue(pendingValue: string){
//     this.setState({pendingValue});
//   }

// }
const myfc:React.FC<Props> = (props) => {
  const [pendingValue, setPendingValue] = useState(props.downloadLocation);
  

  const submitChange = () => {
    console.log('go');
    props.setDownloadLocation(pendingValue);
    console.log('gone');
  };
  return <div>
    <h2>download location is {props.downloadLocation}</h2>
    <hr/>
    <input type="text" value={pendingValue} onChange={(event) => setPendingValue(event.target.value)} />
    <button disabled={pendingValue == props.downloadLocation} onClick={submitChange}> submit </button>
    {/* <hr/>
    <pre>
      {JSON.stringify(props)}
    </pre> */}
  </div>;
};

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, State> = function(state, ownProps) {
  return {
    downloadLocation: state.preferences.downloadLocation,
  };
}
const mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IOwnProps> = function (dispatch, ownProps) {
  return {
    setDownloadLocation(location: string) {
      console.log('*** dispatch ***', dispatch(actions.setPreferences({ downloadLocation: location })) as any, '<---');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(myfc);