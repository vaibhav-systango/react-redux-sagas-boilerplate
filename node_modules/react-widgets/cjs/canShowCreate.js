"use strict";

exports.__esModule = true;
exports.default = canShowCreate;

function canShowCreate(allowCreate, {
  searchTerm = '',
  data,
  dataItems,
  accessors
}) {
  const eq = v => accessors.text(v).toLowerCase() === searchTerm.toLowerCase(); // if there is an exact match on textFields:
  // "john" => { name: "john" }, don't show


  const hasExtactMatch = () => dataItems && dataItems.some(eq) || data.some(eq);

  return !!((allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !hasExtactMatch());
}