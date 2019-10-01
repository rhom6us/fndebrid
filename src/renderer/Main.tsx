import { Store } from 'redux'
import React from "react"
import DevTools from './containers/DevTools';
import { Provider } from 'react-redux';
import { Router } from 'react-router-static';

interface MainProps {
  store: Store<any>
}
const routes = { // A map of "route" => "component"
  default: Main, // Default component to mount when no other route is detected
  debug: DevTools,
};

const Main: React.FC<MainProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <Router routes={routes} />,
    </Provider>
  )
}

export default Main;