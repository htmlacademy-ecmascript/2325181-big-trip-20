function findArrayElementById (array, elementId) {
  return array.find((element) => element.id === elementId);
}

function findArrayElementByType (array, elementType) {
  return array.find((element) => element.type === elementType);
}

function findArrayElementByName (array, elementName) {
  return array.find((element) => element.name === elementName);
}

export { findArrayElementById, findArrayElementByType, findArrayElementByName };
