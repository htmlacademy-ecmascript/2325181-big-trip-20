function findArrayElementById (elements, elementId) {
  return elements.find((element) => element.id === elementId);
}

function findArrayElementByType (elements, elementType) {
  return elements.find((element) => element.type === elementType);
}

function findArrayElementByName (elements, elementName) {
  return elements.find((element) => element.name === elementName);
}

export { findArrayElementById, findArrayElementByType, findArrayElementByName };
