import { useState } from 'react';
import useFocusManagerBase from '@restart/hooks/useFocusManager';
import useEventCallback from '@restart/hooks/useEventCallback';
import useMounted from '@restart/hooks/useMounted';
import matches from 'dom-helpers/matches';

const isInDisabledFieldset = node => {
  return !!node && matches(node, 'fieldset[disabled] *');
};

export default function useFocusManager(ref, props = {}, opts = {}) {
  const isMounted = useMounted();
  const [focused, setFocus] = useState(false);
  const isDisabled = useEventCallback(() => props.disabled === true || isInDisabledFieldset(ref.current));
  const events = useFocusManagerBase(Object.assign({}, opts, {
    isDisabled,
    onChange: focused => {
      if (isMounted()) setFocus(focused);
    },

    didHandle(focused, event) {
      let handler = props[focused ? 'onFocus' : 'onBlur'];
      if (handler) handler(event); // @ts-ignore used by work

      if (opts.didHandle && !event.isWidgetDefaultPrevented) opts.didHandle(focused, event);
    }

  }));
  return [events, focused, setFocus];
}