import React from 'react';
import DevTools from './DevTools';
import configureStore from '../configureStore';

export default () => (
    <DevTools store={configureStore()} />
);

