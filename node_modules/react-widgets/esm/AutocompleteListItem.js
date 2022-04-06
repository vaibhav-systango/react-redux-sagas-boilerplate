import PropTypes from 'prop-types';
import React from 'react';
const propTypes = {
  text: PropTypes.string,
  searchTerm: PropTypes.string
};

function AutocompleteListItem({
  text,
  searchTerm
}) {
  if (!text || !searchTerm) return text;
  let idx = text.indexOf(searchTerm);
  if (idx === -1) idx = text.toLowerCase().indexOf(searchTerm);
  if (idx === -1 || searchTerm.length >= text.length) return text;
  return /*#__PURE__*/React.createElement(React.Fragment, null, text.slice(0, idx), /*#__PURE__*/React.createElement("strong", null, text.slice(idx, idx + searchTerm.length)), text.slice(idx + searchTerm.length));
}

AutocompleteListItem.propTypes = propTypes;
export default AutocompleteListItem;