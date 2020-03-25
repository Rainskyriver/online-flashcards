function shuffle(array) {
  const returnArray = array.slice(0);
  var currentIndex = returnArray.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = returnArray[currentIndex];
    returnArray[currentIndex] = returnArray[randomIndex];
    returnArray[randomIndex] = temporaryValue;
  }
  return returnArray;
}

const randomSelection = (id, arr) => {
  if (arr.length < 1) {
    return [];
  }
  const returnArray = [];
  let firstIndex = Math.floor(Math.random() * arr.length);
  returnArray.push(arr[id]);
  while (firstIndex === id) {
    firstIndex = Math.floor(Math.random() * arr.length);
  }
  returnArray.push(arr[firstIndex]);
  let secondIndex = Math.floor(Math.random() * arr.length);
  while (secondIndex === firstIndex || secondIndex === id) {
    secondIndex = Math.floor(Math.random() * arr.length);
  }
  returnArray.push(arr[secondIndex]);
  return returnArray;
};

module.exports = { shuffle, randomSelection }