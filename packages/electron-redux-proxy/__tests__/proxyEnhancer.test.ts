import {createStore, proxyEnhancer} from '../src';

test('createStore exports', () => {
  expect(createStore).toBeDefined();
});

test('proxyEnhancer exports', () => {
  expect(proxyEnhancer).toBeDefined();
});
