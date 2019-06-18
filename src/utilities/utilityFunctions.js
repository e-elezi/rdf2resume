export const getLabelFromURI = uri => {
  let uriIndex = uri.lastIndexOf("#");
  return uri.substring(uriIndex);
};

export const processInitialEndpointData = (head, results) => {
  let varNames = head.vars;
  results = results.bindings;
};
