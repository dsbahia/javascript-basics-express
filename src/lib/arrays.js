const getNthElement = (index, array) => {
  return array[index % array.length];
};

const arrayToCSVString = array => {
  return array.join();
};

const csvStringToArray = string => {
  return string.split(',');
};

const addToArray = (element, array) => {
  array.push(element);
};

const addToArray2 = (element, array) => {
  return array.concat(element);
};

const removeNthElement = (index, array) => {
  array.splice(index, 1); 
};

const numbersToStrings = numbers => {
  return numbers.map(number => number.toString());
};

const uppercaseWordsInArray = strings => {
  return strings.map(string => string.toUpperCase());
};

const reverseWordsInArray = strings => {
  // using a for loop instead of .map - i = iterator 
  const reversedArray = [];
  for (let i = 0; i < strings.length; i++) {
    const reversedString = strings[i].split('').reverse().join('');
    reversedArray.push(reversedString);
  }
  return reversedArray;
};

const onlyEven = numbers => {
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  return evenNumbers;
};

const removeNthElement2 = (index, array) => {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return array.slice(0, index).concat(array.slice(index + 1));
};

const elementsStartingWithAVowel = strings => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const vowelStrings = strings.filter(string => {
    const firstChar = string[0]?.toLowerCase();
    return vowels.includes(firstChar);
  });
  return vowelStrings;
};

const removeSpaces = string => {
  return string.split(' ').join('');
};

const sumNumbers = numbers => {
  let s = 0;
  for (let i = 0; i < numbers.length; i++) {
    s += numbers[i]
  }
  return s;
};

const sortByLastLetter = strings => {
  return strings.sort((a, b) => {
    const lastCharA = a.charCodeAt(a.length - 1);
    const lastCharB = b.charCodeAt(b.length - 1);
    return lastCharA - lastCharB;
  });
}

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter
};
