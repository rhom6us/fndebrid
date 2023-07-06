import { FnState, FnStore } from '@fndebrid/store';
import { identity, isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useStore } from 'react-redux';

export function useEventSource<TResult>(selector: (state: FnState) => TResult = identity): TResult {
  return useSelector(selector, isEqual);
  // const store = useStore() as FnStore;
  // const [state, setState] = useState(() => store.getState());
  // useEffect(() => {
  //   return store.subscribe(() => {
  //     setState(store.getState());
  //   });
  // }, [store]);
  // return useMemo(() => selector(state), [state]);
}
