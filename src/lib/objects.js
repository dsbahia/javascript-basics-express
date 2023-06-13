/* eslint-disable no-plusplus */
const createPerson = (name, age) => {
  const person = { name, age };
  return person;
};

const getName = object => {
  return object.name;
};

const getProperty = (property, object) => {
  return object[property];
};

const hasProperty = (property, object) => {
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === property.toString()) {
      return true;
    }
  }
  return false;
};

const isOver65 = person => {
  return person.age > 65;
};

const getAges = people => {
  return people.map(person => person.age);
};

const findByName = (name, people) => {
  return people.find(person => person.name === name);
};

const findHondas = cars => {
  return cars.filter(car => car.manufacturer === 'Honda');
};

const averageAge = people => {
  if (people.length === 0) {
    return 0;
  }
  const avgAge = people.reduce((acc, person) => acc + person.age, 0);
  return avgAge / people.length;
};

const createTalkingPerson = (name, age) => {
  return {
    name,
    age,
    introduce: otherPerson => {
      return `Hi ${otherPerson}, my name is ${name} and I am ${age}!`;
    }
  };
};

module.exports = {
  createPerson,
  getName,
  getProperty,
  hasProperty,
  isOver65,
  getAges,
  findByName,
  findHondas,
  averageAge,
  createTalkingPerson
};
