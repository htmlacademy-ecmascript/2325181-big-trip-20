function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(max) {
  return Math.floor(Math.random() * max);
}

export {getRandomArrayElement, getRandomValue};
