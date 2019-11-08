import { createStore, proxyEnhancer } from '../src';

test('proxyEnhancer exports', () => {
  expect(proxyEnhancer).toBeDefined();
});
test('createStore exports', () => {
  expect(createStore).toBeDefined();
});
