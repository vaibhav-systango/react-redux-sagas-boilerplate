import * as PropTypes from 'prop-types';
export const elementType = PropTypes.elementType;
export let disabled = Object.assign((...args) => PropTypes.bool(...args), {
  acceptsArray: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
});
export const accessor = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
export const message = PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]);